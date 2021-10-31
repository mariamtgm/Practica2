import { connectMongo } from "./mongo/mongoconnects";
import { getCharacters } from "./rickmortyapi";
import { Character } from "./types";
import { MongoClient } from "mongodb";
import { idText } from "typescript";


const run = async () => {
  try {
    const uri = "mongodb+srv://mariamtgm:1234@cluster0.r3pkp.mongodb.net/RickyMorty?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    // console.log("Mongo Connected");

    client.connect().then(async () => {
      console.log("OKProgramacion-I");

      let next: string = "https://rickandmortyapi.com/api/character/";
      while (next) {
        const data: { next: string; characters: Character[] } = await getCharacters(
          next
        );
        const characters = data.characters.map((char) => {
          const { id, name, status, species, episode } = char;
          return {
            id,
            name,
            status,
            species,
            episode,
          };
        });

        // ADD CHARACTERS HERE TO THE DATABASE, AND GO FOR THE NEXT PAGE
        client.db("RickyMorty").collection("personajes").insertMany(characters);
        console.log(characters);
        next = data.next;
      }
    });

  } catch (e) {
    console.log(e);
  }

};

try {
  run();
} catch (e) {
  console.error(e);
}