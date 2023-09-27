import fs from "node:fs";

enum animeType {
    "tv",
    "m0v1e",
    "special",
    "ova",
    ""
  }
  
  interface Anime {
    id: number;
    title: string;
    title_english: string;
    title_romanji: string;
    title_french: string | null;
    others: string;
  
    type: animeType;
    status: string; //TODO change this to a status enum
    popularity: number;
    url: string;
    genres: string[]; //TODO change this to a genre enum array
    url_image: string;
    score: string;
    start_date_year: string;
    nb_eps: string;
    lang?: "vf" | "vostfr";
  }

function buildRegex(title: string){
  // escaoe every character that is not a letter or a number
  title = title.replace(/[^a-z0-9]/gi, '\\$&');
  return new RegExp(`^\\b${title}\\b`, 'i');
}

async function groupAnimeBySimilarName(animeList: Anime[]) {
    const groupedAnime: { [anime: string]: number[] } = {};
    animeList = animeList.sort((a, b) => a.id - b.id).sort((a, b) => parseInt(a.start_date_year) - parseInt(b.start_date_year));
    animeList.forEach((anime) => {
      let animeTitle = anime.title ? anime.title.trim() : false;
      let animeRomanji = anime.title_romanji ? anime.title_romanji.trim() : false;
      let id = anime.id
        let matched = false;
        for (const existingAnime in groupedAnime) {
          let currentId = parseInt(existingAnime.split("-")[0]);
          let animeToCheck = animeList.find(e => e.id === currentId);
          let title_ro= animeToCheck?.title_romanji, title_fa = animeToCheck?.title
          if(animeRomanji && title_ro){
           let regex = buildRegex(title_ro);
            if (regex.test(animeRomanji)){
              groupedAnime[existingAnime].push(id);
              matched = true;
              break;
            }else if(animeTitle && title_fa){
              regex = buildRegex(title_fa);
              if (regex.test(animeTitle)){
                groupedAnime[existingAnime].push(id);
                matched = true;
                break;
              }
            }      
        }
     }
        if (!matched) {
          console.log(`License ${anime.id} added to the list, ${Object.keys(groupedAnime).length} licenses in the list now`);
          groupedAnime[id.toString() + "-anime"] = [id];
        }
     
      });
  
    const result = Object.keys(groupedAnime).map((animeName) => {
      let animeFind = animeList.find((anime) => anime.id === groupedAnime[animeName][0]) as Anime;
      return ({
      title: animeFind.title,
      ids: groupedAnime[animeName],
      title_english: animeFind.title_english,
      cover_url: animeFind.url_image,
      others: animeFind.others,
      genres: animeFind.genres,
      title_romanji: animeFind.title_romanji,
      seasons: groupedAnime[animeName].map((id) => ({
        year: parseInt((animeList.find((anime) => anime.id === id)as Anime).start_date_year),
        fiche: animeList.find((anime) => anime.id === id) as Anime,
        })).sort((a, b) => a.year - b.year),
    })
    });
    console.log(result.length);
    result.sort((a, b) => a.seasons[0].fiche.popularity - b.seasons[0].fiche.popularity);
    fs.writeFileSync("./saisons.json", JSON.stringify(result));
    return true;
  }
  
(async () => {
  const fetched =  await fetch("https://api.gazes.fr/anime/animes")
    const json = await fetched.json() as {
      data: Anime[],
      success: boolean
    }
    await groupAnimeBySimilarName(json.data);
  })();