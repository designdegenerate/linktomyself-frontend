export default function determineSection(contentType) {
  let section = {
    title: false,
    author: false,
    description: false,
    authorType: "",
    image: false,
    imageAlt: false,
    url: false,
  };

  switch (contentType) {
    case "quotes":
      section.title = true;
      section.author = true;
      break;

    case "books":
      section.title = true;
      section.author = true;
      section.description = true;
      section.authorType = "Author";
      section.url = true;
      break;

    case "films":
      section.title = true;
      section.author = true;
      section.description = true;
      section.authorType = "Director";
      section.url = true;
      break;

    case "tvShow":
      section.title = true;
      section.author = true;
      section.description = true;
      section.authorType = "Made By";
      section.url = true;
      break;

    case "games":
      section.title = true;
      section.description = true;
      section.author = true;
      section.authorType = "Made By";
      section.image = true;
      section.imageAlt = true;
      section.url = true;
      break;

    case "podcasts":
      section.title = true;
      section.description = true;
      section.author = true;
      section.authorType = "Host";
      section.image = true;
      section.imageAlt = true;
      section.url = true;
      break;

    case "albums":
      section.title = true;
      section.description = true;
      section.author = true;
      section.authorType = "Musician";
      section.url = true;
      break;

    case "artworks":
      section.title = true;
      section.description = true;
      section.author = true;
      section.authorType = "Artist";
      section.image = true;
      section.imageAlt = true;
      section.url = true;
      break;

    case "food":
      section.title = true;
      section.description = true;
      section.image = true;
      section.imageAlt = true;
      section.url = true;
      break;

    case "drinks":
      section.title = true;
      section.description = true;
      section.url = true;
      break;

    case "restaurants":
      section.title = true;
      section.description = true;
      section.url = true;
      break;

    case "bars":
      section.title = true;
      section.description = true;
      section.url = true;
      break;

    case "places":
      section.title = true;
      section.description = true;
      section.url = true;
      break;

    case "musicians":
      section.title = true;
      section.description = true;
      section.url = true;
      break;

    case "artists":
      section.title = true;
      section.description = true;
      section.url = true;
      break;

    case "directors":
      section.title = true;
      section.description = true;
      section.url = true;
      break;

    case "actors":
      section.title = true;
      section.description = true;
      section.url = true;
      break;

    default:
      break;
  }

  return section;
}
