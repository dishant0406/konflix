import React from "react"
import Head from "next/head"

export default function SEO({
  author = "Dishant Sharma",
  meta,
  title = "Konflix and Chill: Where Anime Lovers Unite!"
}) {
  const metaData = [
    {
      name: `description`,
      content: `Watch your favorite anime series and movies online at Konflix. Enjoy high-quality streaming and a vast collection of titles. Sign up now for a free trial.`
    },
    {
      property: `og:title`,
      content: `Konflix - Anime Streaming Website`
    },
    {
      property: `og:description`,
      content: `Watch your favorite anime series and movies online at Konflix. Enjoy high-quality streaming and a vast collection of titles. Sign up now for a free trial.`
    },
    {
      property: `og:type`,
      content: `website`
    },
    {
      name: `twitter:card`,
      content: `summary_large_image`
    },
    {
      name: `twitter:creator`,
      content: `@KonflixOfficial`
    },
    {
      name: `twitter:title`,
      content: `Konflix - Anime Streaming Website`
    },
    {
      name: `twitter:description`,
      content: `Watch your favorite anime series and movies online at Konflix. Enjoy high-quality streaming and a vast collection of titles. Sign up now for a free trial.`
    }
  ]
  .concat(meta)
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <link rel="icon" href="/Images/favicon.ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      {metaData.map(({ name, content }, i) => (
        <meta key={i} name={name} content={content} />
      ))}
    </Head>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``
}
