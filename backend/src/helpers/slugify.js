import slugify from "slugify";

const options = {
  replacement: '-',
  lower: true,
  locale: 'fr',
  trim: true
};

export const slug = (title) => slugify(title, options);

