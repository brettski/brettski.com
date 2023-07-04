<script>
	import dayjs from 'dayjs';

	// 	export let title;
	// 	export let date;

	//   const prettyDate = dayjs(date).format('dddd, MMMM D, YYYY (HH:mm)').toString()
</script>

<div class="prose prose-orange prose-a:text-green-300 hover:prose-a:text-gray-300">
	<!-- <h1 class="text-gray-600">{title}</h1> -->
	<!-- <p class="italic text-gray-400 text-sm">{prettyDate}</p> -->

	<slot />
</div>
