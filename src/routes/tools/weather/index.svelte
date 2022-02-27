<script context="module">
	let paw, ord;

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ fetch }) {
		paw = await fetch('https://api.weather.gov/stations/kpwk/observations/latest').then((d) =>
			d.json(),
		);
		ord = await fetch('https://api.weather.gov/stations/kpwk/observations/latest').then((d) =>
			d.json(),
		);

		return {};
		// return {
		// 	props: {
		// 		paw,
		// 	},
		// };
	}
</script>

<script>
	import lname from './weather';
	console.log('lname\n', lname);

	const newName = lname.env;

	function c2f(c) {
		return (c * 1.8 + 32).toFixed(1);
	}
</script>

<div class="p-10">hi {newName}</div>
<h2>Palwaukee</h2>
<div class="mx-10 mt-5 mb-10">
	<div>
		Temp: {paw.properties.temperature.value} C° ({c2f(paw.properties.temperature.value)} F°)
	</div>
	<div>
		Dewpoint: {paw.properties.dewpoint.value} C° ({c2f(paw.properties.dewpoint.value)} F°)
	</div>
	<div>
		Rel Hum: {paw.properties.relativeHumidity.value.toFixed(1)} %
	</div>
</div>
<h2>O'Hare</h2>
<div class="mx-10 mt-5 mb-10">
	<div>
		Temp: {ord.properties.temperature.value} C° ({c2f(ord.properties.temperature.value)} F°)
	</div>
	<div>
		Dewpoint: {ord.properties.dewpoint.value} C° ({c2f(ord.properties.dewpoint.value)} F°)
	</div>
	<div>
		Rel Hum: {ord.properties.relativeHumidity.value.toFixed(1)} %
	</div>
</div>
