import { gql } from "apollo-boost";

const GET_TOP_ANIME = gql`
  query TopAnime($page: Int) {
  topAnime(page: $page) {
    animeDetails {
        title
        otherName
        image
    }
  }
}
`

export {
  GET_TOP_ANIME
}