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

		return {
			props: {
				paw,
			},
		};
	}
</script>

<script>
	import lname from './weather';
	console.log(lname);
</script>

<div class="p-10">hi {lname.brett}</div>
<h2>Palwaukee</h2>
<div class="m-10 border-2 border-pink-200">
	<div>
		Temp: {paw.properties.temperature.value}
	</div>
	<div>
		Dewpoint: {paw.properties.dewpoint.value}
	</div>
	<div>
		Rel Hum: {paw.properties.relativeHumidity.value} %
	</div>
</div>
<h2>O'Hare</h2>
<div class="border-2 m-10 border-gray-400">
	<div>
		Temp: {ord.properties.temperature.value}
	</div>
	<div>
		Dewpoint: {ord.properties.dewpoint.value}
	</div>
	<div>
		Rel Hum: {ord.properties.relativeHumidity.value} %
	</div>
</div>
