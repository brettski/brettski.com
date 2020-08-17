import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import mdPosts from '../../content/blog/*.md';
dayjs.extend(utc);

function transform ({ html, metadata, filename, path }) {
  const date = dayjs(metadata.date).utc();
  const flattened = {
    html,
    ...metadata,
    filename,
    path,
    year: date.year(),
    month: date.month() + 1,
    yearMonth: date.format('YYYYMM'),
  };
  // field updates
  flattened.author == 'brettski111' ? 'Brett Slaski' : flattened.author;

  return flattened;
}

// Let's get the posts all parsed up and ready
const categories = new Set();
const tags = new Set()
let tposts = mdPosts.map(p => transform(p));
tposts = tposts.sort((a,b) => {
  if (dayjs(a.date) < dayjs(b.date)) return -1
  if (dayjs(a.date) > dayjs(b.date)) return 1
  return 0
});
tposts.forEach(p => {
  if (p.tags) {
    p.tags.forEach(tag => tags.add(tag));
  }
  if (p.categories) {
    p.categories.forEach(cat => categories.add(cat));
  }
})
console.log('tposts: ', tposts[0], Object.keys(tposts[0]));
console.log('categories', [...categories]);

// posts function
function posts () {

  function all() {
    return tposts
  }

  return { 
    all,
  }
}
export default  posts;

