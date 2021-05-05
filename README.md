# Project

This is a tool that uses OpenAQ Data to compare averages between multiple locations.

Check out the site live at https://kylemercer-aqat.netlify.app/.

# Purpose

This project was created as part of an initial code assessment, restricted to using Semantic UI Component library and
the data from OpenAQ. From there, I decided to use this project to learn React Query (instead of defaulting to
Redux/Thunks).

## Challenges

1. OpenAQ provides a lot of data overall, including both good and bad data. It can be anywhere from a few hundred to
   tens of thousands.

2. There is no direct correlation between a City and an Air Quality Average. In order to get "Average" data, I needed to
   filter the list by Location (which is a smaller unit than City).

3. The average/measurements return in numerous different formats. It is difficult to do a comparison (within a line
   chart) as each format can mean something completely different from the next, which is why I opt'd to show the data in
   a simple table initially.

   - With more time, this could be converted into a working line chart with a dropdown selection of formats or converted
     to a single format.

4. I abstracted out Semantic UI's Select into a component to rework the placeholder instance. In my opinion, when the
   user selects a dropdown and clicks away, it should stay at the current value. Semantic UI changes the value when
   there is no value assigned.

## Side-Notes

1. I use a mixture of "styles" and "classes" for CSS. Normally, I'll use TailwindCSS as a default. However, I've learned
   from working with TailwindCSS that establishing a "style" attribute isn't bad, but it depends on the implementation.
   When you are building purely CSS/SCSS files, then you may rarely want "styles". However, when you are using utility
   classes, I think mixing styles with utility classes is a good way to go.

2. React Query is not optimized within the application. Currently, it is refetching data every so often.

3. Lack of barrel files. Normally, I use barrel files for everything to reduce the path from
   `src/Components/Address/Address` to `src/Components/Address`.

4. No testing.

5. I abstracted out a lot of information associated to each endpoint. My objective was to reduce the amount of time
   spent looking at the docs and more reliance on using intellisense for faster development.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
