const path = require('path');
const fs = require('fs');

function resolve () {
  return path.resolve(__dirname, '../src', ...arguments);
}

const VIEWS_DIR = resolve('views');

const camelizeFileName = (filename) => {
  return filename
    .replace(/(\.vue|\.js|\.json)$/g, '')
    .replace(/(^\w|[-/_]\w|\s\w)/g, (match) => {
      return match.replace(/(\s|-)/g, '').toUpperCase();
    });
};

function mapFileName (node) {
  return node.fname;
}

function filterNodes (nodes, filter) {
  return nodes.filter(filter)
    .map(mapFileName)
    .filter(v => !v.startsWith('@'));
}

function getNodeFiles (nodes) {
  return filterNodes(nodes, v => !v.children)
    .filter(v => /\.(vue|js)$/.test(v));
}

function getNodeDirectories (nodes) {
  return filterNodes(nodes, v => !!v.children);
}

function getNodeConfigFiles (nodes) {
  return filterNodes(nodes, v => !v.children)
    .filter(v => /\.json$/.test(v));
}

function buildRouter (nodes, propagate, context) {
  const router = [];
  const files = getNodeFiles(nodes);
  const directories = getNodeDirectories(nodes);
  const configFiles = getNodeConfigFiles(nodes);
  const ignorables = [];

  files.forEach(file => {
    const route = {};
    const localctx = {};
    const basename = file.replace('.vue', '');
    const config = configFiles.includes(`${basename}.json`)
      ? JSON.parse(fs.readFileSync(nodes.find(v => v.fname === `${basename}.json`).fullpath))
      : {};

    let localprop;

    route.path = context && context.depth ? '' : '/';
    route.path += file === 'index.vue' ? '' : basename;
    route.path = (config.path || route.path).replace(/_/g, ':');
    route.component = (context && context.cprefix) || '';
    route.component += file;

    Object.assign(localctx, context);
    localctx.cprefix = `${(localctx && localctx.cprefix) || ''}${basename}/`;
    localctx.depth = localctx.depth ? localctx.depth + 1 : 1;
    localctx.nprefix = `${(localctx && localctx.nprefix) || ''}${basename}/`;

    if (config.propagateMeta) {
      localprop = Object.assign({}, config.propagateMeta);
    }

    if (directories.includes(basename)) {
      ignorables.push(basename);
      route.children = buildRouter(nodes.find(v => v.fname === basename).children, localprop, localctx);
    } else {
      route.name = camelizeFileName(((context && context.nprefix) || '') + ' ' + basename);
    }

    if (propagate) {
      route.meta = propagate;
    }

    router.push(route);
  });

  directories.filter(d => !ignorables.includes(d)).forEach(directory => {
    const localctx = {};
    // let localprop = undefined

    Object.assign(localctx, context);
    localctx.cprefix = `${(localctx && localctx.cprefix) || ''}${directory}/`;
    localctx.depth = 0;
    localctx.nprefix = `${(localctx && localctx.nprefix) || ''}${directory}/`;

    const children = buildRouter(nodes.find(n => n.fname === directory).children, propagate, localctx);
    children.forEach(child => {
      child.path = (directory + child.path).replace(/_/g, ':');
      router.push(child);
    });
  });

  router.sort(sortPathName);
  // router.sort((a, b) => a.path.length - b.path.length)
  return router;
}

function sortPathName (nodeA, nodeB) {
  const pathA = nodeA.path;
  const pathB = nodeB.path;
  const nslashA = (pathA.match(/\//g) || []).length;
  const nslashB = (pathB.match(/\//g) || []).length;

  if (nslashA === nslashB) {
    const tailA = pathA.match(/\/\w*$/);
    const tailB = pathB.match(/\/\w*$/);
    const sA = ((tailA && tailA[0]) || pathA).length;
    const sB = ((tailB && tailB[0]) || pathB).length;
    return sA - sB;
  } else {
    return nslashA - nslashB;
  }
}

function buildTree (base) {
  const root = fs.readdirSync(base);
  return root.map(fname => {
    const child = path.resolve(base, fname);
    const fullpath = resolve(base, fname);
    const children = (fs.lstatSync(child).isDirectory())
      ? buildTree(child)
      : undefined;
    return { fname, children, fullpath };
  });
}

// For debugging
// console.log(JSON.stringify(buildTree(VIEWS_DIR), null, 4));
// console.log(JSON.stringify(buildRouter(buildTree(VIEWS_DIR)), null, 4));

module.exports = function (source) {
  if (this.cacheable) this.cacheable();
  let value = typeof source === 'string' ? JSON.parse(source) : source;
  value = buildRouter(buildTree(VIEWS_DIR));
  this.addDependency(VIEWS_DIR);
  fs.writeFileSync(path.resolve(__dirname, '../', 'generated-routes.json'), JSON.stringify(value, null, 2));
  value = JSON.stringify(value)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

  return `module.exports = ${value}`;
};
