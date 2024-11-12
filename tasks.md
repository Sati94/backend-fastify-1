# Tasks

## Prepare the project

Use your favorite Postgres DB, a container option is available in this repo too (`docker compose up -d`). 

Import the `pets.sql` scheme and data into the database.

Modify the connection string in the `./src/db.ts`, and start the dev server (`npm run dev`).

You can try out the `GET /api/pets`, `POST /api/pets` endpoints.

## Get familiar with the code base

Answer the following questions:

- Which architecture is applied in this repo? 
  layered architecture
- What kind of elements/components can you identify?

Controllers: Kezeli a bejövő kéréseket, interakcióba lép a szolgáltatásokkal és válaszokat küld.
Services (if present): Üzleti logikát tartalmaznak, közvetítőként működnek a vezérlők és az adattárak között.
Repositories (ownerRepository.ts, petRepository.ts): kölcsönhatásba léphet az adatbázissal, kezelheti az adatlekérést és -kezelést.
Entities (pet-type.ts): Az adatentitások szerkezetét reprezentáló típusok vagy interfészek meghatározása
Database Client (DbClient): Likely an abstraction layer or dependency that manages database connections.

- Where is the entry point of the repo?
server.ts
- What is the scope of the repositories?
 A repok a közvetlen adatbázis-műveletekre összpontosítanak, különösen az egyes entitások (például tulajdonos és házi kedvenc) CRUD funkcióira. Minden adattár absztrahálja az adatokhoz való hozzáférést, így az adatkezelőknek vagy a szolgáltatásoknak nem kell az adatbázis részleteivel foglalkozniuk.

- What is the scope of the services?
  Üzleti logika beágyazása lenne a hatóköre. Ez az a hely, ahol összetett műveleteket kezelhet, amelyek több lépést vagy adattár-interakciókat foglalnak magukban. A szolgáltatások hídként működnek a vezérlők és a tárolók között, egyértelmű interfészt biztosítva az alkalmazáslogikához.
- What is happening in the controllers?
 a bejövő HTTP kéréseket kezelik. Elemezik a kérésadatokat, meghívják a megfelelő szolgáltatást (vagy tárolót, ha nem létezik szolgáltatási réteg), és visszaküldik a megfelelő HTTP-választ a kért művelet eredménye alapján.

- Why do we use the `DbClient` type in the pet repository?
A DbClient típus az adatbázis-interakciók szabványosított kezelésére szolgál. Valószínűleg konzisztens felületet biztosít az adatbázis-műveletekhez, például a kapcsolatok megnyitásához és zárásához, a tranzakciók kezeléséhez és a lekérdezések futtatásához. Ez az absztrakció elősegíti a kód újrafelhasználását, és segít elkerülni a duplikált kapcsolati logikát a tárolókban.

- What would you improve in this codebase?
Error Handling
Environment Configuration
Validation: Hogy a vezérlők megkapják a várt adatformátumokat és értékeket, csökkentve ezzel a futásidejű hibák kockázatát.
Logging

- How does the code handle the `async` route handlers?

Aszinkron útvonalkezelők kezelése: Ha az útvonalkezelők aszinkronok, a kódnak minden aszinkron funkción belül try/catch blokkokat kell használnia a lehetséges hibák kezelésére és a megfelelő hibaválaszok küldésére. Alternatív megoldásként beállítható egy hibakezelő köztes szoftver is, amely felfogja a kezeletlen ígéretek elutasítását az alkalmazásban, és normál hibaüzenettel válaszol.

### Background material

- https://fastify.dev/docs/latest/Reference/Routes/#async-await

## Task 1: Never trust your users

Right now the user can provide any kind of body for the POST request. Ensure that the body should fulfill the following requirements.

- Tha name must be a non zero length string at most 50 chars long.
- The age must be a positive number.
- The weight in kg must be also a positive number.

- What do you think, why does it needed?

### Background materials

- https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/
- https://fastify.dev/docs/latest/Reference/Type-Providers/

## Task 2: Determines the reply's body

Add a desired output schema (deserialization) to the `GET /api/pets` and `POST /api/pets`.

- What do you think what is the advantage of this?

## Task 3: Demo: Handle the configuration

It is not so convenient how we are connecting to the database.

- What is the disadvantages of this solution? How would you fix it?
- What else would you make configurable?
- How would you type the configuration?
- Where would you read the configuration?
- What is the type of environment variables in Javascript?

### Background material
- https://www.npmjs.com/package/dotenv

## Task 4: Practice: Create owner endpoints

- Create a `GET /api/owners` and `POST /api/owners`.
- The owner's name should be at least 1 character but do not exceed the char number 50.
- Take care of the validation and the deserialization.

## Task 5: Demo: Organize the routes

Our `app.ts` staring to getting bigger and bigger. It is worth to start organizing the routes out.

Fastify has a plugin concept to organize everything. It can be used for that. How?

## Task 6: Extract the owner routes

- Extract the owner routes to a separate fastify plugin. 


### Background materials

- https://fastify.dev/docs/latest/Reference/Plugins/

## Task 7: Demo: Decorate the Fastify Instance

It can be ok to pass down the `petService` to every routes, but also it is possible to make it accessible on all of the `fastify` instances.

- Create a decorator for the `petService` and use it in the routes. Where would you put the decorator if you would use it in multiple routes?
- How can you alter the type of original `fastify` instance to support the new `petService` prop on it? Which typescript feature can help us in this case?

### Background materials

- https://fastify.dev/docs/latest/Reference/Decorators/
- https://fastify.dev/docs/latest/Reference/TypeScript/#plugins

## Task 8: Create a decorator for the owner service too

## Task 9: Show kinds

- Modify the implementation to show a textual kind as a kind property of the pet.

## Task 10: Show all kinds

- Create an endpoint to show all possible kinds with their ID.

## Task 11: Save the kind for new pets

- Modify the `POST /api/pets` to accept a `kindId`.

## Task 12: Modify the pet

- Create a new endpoint to modify the pet's properties. 
- It can be a partial modification too.

## Task 13: Assign an owner to a pet

- Create a new endpoint to assign a pet ID with an owner Id.
 