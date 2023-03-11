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

const GET_SINGLE_ANIME = gql`
query Query($animeDetailsId: ID!) {
  animeDetails(id: $animeDetailsId) {
    image
    genres
    subOrDub
    releaseDate
    totalEpisodes
    trailer
    title
    episodes {
      id
      streamLinks {
        episodeId
        isM3U8
        url
        quality
      }
    }  
  }
}
`

export {
  GET_TOP_ANIME,
  GET_RECENT_ANIME,
  GET_SINGLE_ANIME
}