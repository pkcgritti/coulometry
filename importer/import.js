const axios = require('axios');
const fs = require('fs');

axios.get('http://localhost:8000/dataset')
	.then(response => {
		const datasets = response.data.payload;
		datasets.forEach(dataset => {
			console.log('Fetching ' + dataset.name);
			axios.get('http://localhost:8000/dataset/' + dataset._id)
				.then(response => {
					const potential = response.data.payload.voltage;
					fs.writeFile(
						'data/' + dataset.name + '.csv',
						potential.map(p => p.toString()).join('\n'),
						function () {
							console.log('Ok');
						}
					);
				})
		})
		
	})
