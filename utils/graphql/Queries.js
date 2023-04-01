import { gql } from "apollo-boost";

const GET_TOP_ANIME = gql`
query TopAnime($page: Int) {
  topAnime(page: $page) {
    imgUrl
    title
    trailer
    id
  }
}
`

const GET_RECENT_ANIME = gql`
query RecentEpisodes($page: Int) {
  recentEpisodes(page: $page) {
    animeId
    name
    episodeId
    episodeNum
    imgUrl  
  }
}
`

const GET_SINGLE_ANIME = gql`
query AnimeDetails($animeDetailsId: ID) {
  animeDetails(id: $animeDetailsId) {
    id
    genres
    status
    name
    released
    totalEpisodes
    synopsis
    trailer
    type
    imageUrl
    episode_id {
      episodeId
    }
  }
}
`

const GET_STREAMING_LINK = gql`
query StreamLinkDetails($animeDetailsId: ID, $streamLinkDetailsId: ID) {
  streamLinkDetails(id: $streamLinkDetailsId) {
    hls
    nextEpLink
    nextEpText
    prevEpLink
    prevEpText
    streamsb
    xstreamcdn
    anime_info
    animeNameWithEP
    ep_num  
  }
  animeDetails(id: $animeDetailsId) {
    name
    imageUrl
    genres
    episode_id {
      episodeId
    }  
  }
}
`

const GET_EPISODES_ID = gql`
query Episodes($animeDetailsId: ID) {
  animeDetails(id: $animeDetailsId) {
    episodes {
      id
      number
    }
  }
}
`

const GET_SEARCH_ANIME = gql`
query AnimeSearch($animeSearchId: ID) {
  animeSearch(id: $animeSearchId) {
    imgUrl
    id
    title  
  }
}
`

const GET_RECOMMEDED_ANIME = gql`
query RecommandedAnime($genre: String) {
  recommandedAnime(genre: $genre) {
    animeTitle
    animeId
    animeImg
  }
}
`

export {
  GET_TOP_ANIME,
  GET_RECENT_ANIME,
  GET_SINGLE_ANIME,
  GET_STREAMING_LINK,
  GET_EPISODES_ID,
  GET_SEARCH_ANIME,
  GET_RECOMMEDED_ANIME
}