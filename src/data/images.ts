// Placeholder photography sourced from Unsplash's CDN for layout/visual purposes.
// Swap these for real ClearPeak Exterior photography (or Sanity-hosted images) at launch.
const unsplash = (id: string, w = 1600, h = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const images = {
  heroHome: unsplash("photo-1600585154340-be6161a56a0c", 1800, 1400),
  heroHomeAlt: unsplash("photo-1512917774080-9991f1c4c750", 1800, 1400),
  modernHouse1: unsplash("photo-1568605114967-8130f3a36994"),
  modernHouse2: unsplash("photo-1449844908441-8829872d2607"),
  modernHouse3: unsplash("photo-1600607687939-ce8a6c25118c"),
  modernHouse4: unsplash("photo-1600596542815-ffad4c1539a9"),
  modernHouse5: unsplash("photo-1600047509807-ba8f99d2cdde"),
  poolHouse: unsplash("photo-1560518883-ce09059eeffa"),
  houseWindows: unsplash("photo-1523217582562-09d0def993a6"),
  patioLifestyle: unsplash("photo-1600210492486-724fe5c67fb0"),
  deckLifestyle: unsplash("photo-1601058268499-e52658b8bb88"),
  drivewayHouse: unsplash("photo-1580587771525-78b9dba3b914"),
  brickHouse: unsplash("photo-1580216643062-cf460548a66a"),
  suburbanStreet: unsplash("photo-1570129477492-45c003edd2be"),
  concreteWalkway: unsplash("photo-1523192193543-6e7296d960e4"),
  frontDoor: unsplash("photo-1613977257363-707ba9348227"),
  commercialBuilding: unsplash("photo-1486406146926-c627a92ad1ab"),
  commercialStorefront: unsplash("photo-1441986300917-64674bd600d8"),
  familyOutdoor: unsplash("photo-1600880292203-757bb62b4baf"),
  coupleOutdoor: unsplash("photo-1592595896616-c37162298647"),
  roofline: unsplash("photo-1632759145351-1d592919f522"),
  denverSkyline: unsplash("photo-1546156929-a4c0ac411f47"),
  mountainSky: unsplash("photo-1519681393784-d120267933ba"),
  teamPortrait1: unsplash("photo-1560250097-0b93528c311a", 800, 800),
  teamPortrait2: unsplash("photo-1568602471122-7832951cc4c5", 800, 800),
  teamPortrait3: unsplash("photo-1573497019940-1c28c88b4f3e", 800, 800),
  blogWashing: unsplash("photo-1517841905240-472988babdf9"),
  blogWindow: unsplash("photo-1527515637462-cff94eecc1ac"),
  blogRoof: unsplash("photo-1592194996308-7b43878e84a6"),
  blogConcrete: unsplash("photo-1600566752355-35792bedcfea"),
} as const;

export type ImageKey = keyof typeof images;
