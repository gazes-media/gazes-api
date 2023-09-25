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

async function groupAnimeBySimilarName(animeList: Anime[]) {
    const groupedAnime: { [anime: string]: number[] } = {};
    animeList = animeList.sort((a, b) => a.id - b.id);
    animeList.forEach((anime) => {
      let animeTitle = anime.title ? anime.title.trim() : false;
      let animeEnglish = anime.title_english ? anime.title_english.trim() : false;
      let animeRomanji = anime.title_romanji ? anime.title_romanji.trim() : false;
      let id = anime.id
        let matched = false;
        for (const existingAnime in groupedAnime) {
          let currentId = parseInt(existingAnime.split("-")[0]);
          let animeToCheck = animeList.find(e => e.id === currentId);
          let title_en = animeToCheck?.title_english, title_ro= animeToCheck?.title_romanji, title_fa = animeToCheck?.title
          if(title_fa && title_fa.length < 2) continue;
          if(title_en && animeEnglish){
          if (animeEnglish.startsWith(title_en)) {
            groupedAnime[existingAnime].push(id);
            matched = true;
            break;
          }else if(animeRomanji && title_ro){
            if (animeRomanji.startsWith(title_ro)){
              groupedAnime[existingAnime].push(id);
              matched = true;
              break;
            }else if(animeTitle && title_fa){
              if (animeTitle.startsWith(title_fa)){
                groupedAnime[existingAnime].push(id);
                matched = true;
                break;
              }
            }
          }
      
        }
     }
        if (!matched) {
          groupedAnime[id.toString() + "-anime"] = [id];
        }
     
      });
  
    const result = Object.keys(groupedAnime).map((animeName) => {
      let animeFind = animeList.find((anime) => anime.id === groupedAnime[animeName][0]);
      if(!animeFind) return;
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
        fiche: animeList.find((anime) => anime.id === id),
        })).sort((a, b) => a.year - b.year),
    })
    });
    console.log(result.length);
    await Bun.write("./saisons.json", JSON.stringify(result, null, 2));
  }
  
(async () => {
  const fetched =  await fetch("https://api.gazes.fr/anime/animes")
    const json = await fetched.json() as {
      data: Anime[],
      success: boolean
    }
    await groupAnimeBySimilarName(json.data);
  })();