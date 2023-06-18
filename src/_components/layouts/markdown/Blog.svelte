<script>
  import dayjs from 'dayjs';

	export let title;
	export let date;

  const prettyDate = dayjs(date).format('MMMM D, YYYY (HH:mm)').toString()
</script>

<article>
	<h1 class="text-green-400">{title}</h1>

  <p>Published: {prettyDate}</p>

	<div class="bg-red-400">
		<slot />
	</div>
</article>
