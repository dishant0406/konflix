import { gql } from "apollo-boost";

const GET_TOP_ANIME = gql`
  query TopAnime($page: Int) {
  topAnime(page: $page) {
    animeDetails {
        title
        otherName
        image
        id
        releaseDate
        subOrDub
    }
  }
}
`

const GET_RECENT_ANIME = gql`
  query RecentEpisodes($page: Int) {
  recentEpisodes(page: $page) {
    hasNextPage
    results {
      animeId
      animeTitle
      episodeId
      episodeNumber
      image
    }
  }
}
`

export {
  GET_TOP_ANIME,
  GET_RECENT_ANIME
}