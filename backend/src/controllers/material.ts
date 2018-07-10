import { GET, POST, DELETE, PUT } from '../decorators/router';
import { Controller } from './base/controller';
import Repositories from '../repositories';
import { Types } from 'mongoose';

function idQuery (id: string) {
  return { 
    _id: Types.ObjectId(id)
  }
}

export class MaterialController extends Controller {
  @GET('/')
  listMaterials () {
    return Repositories.Material.find()
  }

  @POST('/', req => [req.body])
  createMaterial (material) {
    return Repositories.Material.createOne(material)
  }

  @GET('/:mid', req => [req.params.mid])
  getMaterial (mid) {
    return Repositories.Material.findOne(idQuery(mid))
  }

  @PUT('/:mid', req => [req.params.mid, req.body])
  updateMaterial (mid, material) {
    return Repositories.Material.updateOne(idQuery(mid), {
      $set: material
    })
  }

  @DELETE('/:mid', req => [req.params.mid])
  deleteMaterial (mid) {
    return Repositories.Material.$findOne(idQuery(mid))
      .then(material => {
        if (!material) throw 404
        return Promise.all(material.elements.map(e => {
          return Repositories.Element.deleteOne(idQuery(e))
        })).then(() => {
          material.remove()
          return material
        })
      })
  }

  @GET('/:mid/elements', req => [req.params.mid])
  listMaterialElements (mid) {
    return Repositories.Material.$findOne(idQuery(mid))
      .then(material => {
        if (!material) throw 404
        return Promise.all(material.elements.map(eid => {
          return Repositories.Element.findOne(idQuery(eid))
        }))
      })
  }

  @POST('/:mid/elements', req => [req.params.mid, req.body])
  createMaterialElement (mid, element) {
    return Repositories.Material.$findOne(idQuery(mid))
      .then(material => {
        if (!material) throw 404
        element.material = material.id
        return Repositories.Element.createOne(element)
          .then(data => {
            material.elements.push(data._id)
            material.save()
            return data
          })
      })
  }

  @GET('/:mid/element/:eid', req => [req.params.mid, req.params.eid])
  getMaterialElement (mid, eid) {
    return Repositories.Material.findOne(idQuery(mid))
      .then(material => {
        if (!material) throw 404
        return Repositories.Element.findOne(idQuery(eid))
          .then(element => {
            if (!element) throw 404
            return element
          })
      })
  }

  @PUT('/:mid/element/:eid', req => [req.params.mid, req.params.eid, req.body])
  updateMaterialElement (mid, eid, element) {
    return Repositories.Material.findOne(idQuery(mid))
      .then(material => {
        if (!material) throw 404
        return Repositories.Element.updateOne(idQuery(eid), {
          $set: element
        })
      })
  }

  @DELETE('/:mid/element/:eid', req => [req.params.mid, req.params.eid])
  deleteMaterialElement (mid, eid) {
    return Repositories.Material.$findOne(idQuery(mid))
      .then(material => {
        if (!material) throw 404
        return Repositories.Element.$findOne(idQuery(eid))
          .then(element => {
            if (!element) throw 404
            element.remove()
            return element
          })
      })
  }
};