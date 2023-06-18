<script>
  import dayjs from 'dayjs';

	export let title;
	export let date;

  const prettyDate = dayjs(date).format('dddd, MMMM D, YYYY (HH:mm)').toString()
</script>

<article class="prose">
	<h1 class="text-green-400">{title}</h1>

  <p class="italic text-gray-400 text-sm">{prettyDate}</p>

	<div class="bg-red-400">
		<slot />
	</div>
</article>
