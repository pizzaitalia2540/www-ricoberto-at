export type MenuItem = {
  id: string;
  category: Category;
  name: string;
  price: number;
  description: string;
  allergens: string;
  pizza?: boolean;
};

export const CATEGORIES = [
  "Suppen",
  "Vorspeisen",
  "Pizza",
  "Pane fatto in casa",
  "Pasta",
  "Salate",
  "Fisch",
  "Al forno",
  "Dolce",
  "Getränke",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_KICKER: Record<Category, string> = {
  Suppen: "Zuppe",
  Vorspeisen: "Antipasti",
  Pizza: "Dal forno a legna",
  "Pane fatto in casa": "Hausgemachtes Brot",
  Pasta: "Primi piatti",
  Salate: "Insalate",
  Fisch: "Pesce",
  "Al forno": "Überbacken",
  Dolce: "Desserts",
  Getränke: "Bevande",
};

export const VEGAN_CHEESE_PRICE = 3;

export type Topping = { name: string; price: number };
export type ToppingGroup = { category: string; items: Topping[] };

export const EXTRA_TOPPINGS: ToppingGroup[] = [
  {
    category: "Basics & Gemüse",
    items: [
      { name: "Knoblauch", price: 0 },
      { name: "Zwiebeln", price: 1.2 },
      { name: "Mais", price: 1.2 },
      { name: "Pfefferoni", price: 1.2 },
      { name: "Ei", price: 1.2 },
      { name: "Champignons", price: 1.5 },
      { name: "Paprika", price: 1.5 },
      { name: "Oliven", price: 1.5 },
      { name: "Jalapeños", price: 1.5 },
      { name: "Ananas", price: 1.5 },
      { name: "Kirschtomaten", price: 1.5 },
      { name: "Spinat", price: 1.5 },
      { name: "Melanzani", price: 1.5 },
      { name: "Zucchini", price: 1.5 },
      { name: "Artischocken", price: 1.5 },
    ],
  },
  {
    category: "Käse & Extras",
    items: [
      { name: "Extra Mozzarella", price: 1.8 },
      { name: "Gorgonzola", price: 2 },
      { name: "Feta / Hirtenkäse", price: 2 },
      { name: "Grana Padano / Parmesan", price: 2 },
      { name: "Ricotta", price: 2 },
    ],
  },
  {
    category: "Fleisch & Fisch",
    items: [
      { name: "Prosciutto Cotto (Kochschinken)", price: 2 },
      { name: "Salami", price: 2 },
      { name: "Salame Piccante", price: 2.2 },
      { name: "Speck", price: 2.2 },
      { name: "Hühnerbrust", price: 2.5 },
      { name: "Thunfisch", price: 2.2 },
      { name: "Sardellen", price: 2 },
    ],
  },
  {
    category: "Gourmet & Premium",
    items: [
      { name: "Rucola", price: 1.8 },
      { name: "Pesto di Pistacchio", price: 2.5 },
      { name: "Tartufata (Trüffelcreme)", price: 2.8 },
      { name: "Prosciutto di Parma", price: 3 },
      { name: "Mozzarella di Bufala", price: 3.2 },
      { name: "Burrata (Ganze Burrata)", price: 3.8 },
      { name: "Garnelen / Scampi", price: 3.9 },
      { name: "Frutti di Mare Mix", price: 3.9 },
    ],
  },
];

/** Minimum order value per delivery postcode (Vienna). */
export const DELIVERY_ZONES: Record<string, number> = {
  "1030": 16,
  "1020": 19,
  "1110": 19,
};

type Raw = [Category, string, number, string, string, boolean?];

const RAW: Raw[] = [
  ["Suppen", "Crema di pomodoro", 6.9, "Cremige Tomatensuppe mit Basilikum", "G"],
  ["Suppen", "Crema di aglio", 7.9, "Cremige Knoblauchsuppe mit Basilikum", "G"],
  ["Suppen", "Crema di broccoli", 7.9, "Cremige Brokkolisuppe mit Obers", "G"],
  ["Suppen", "Zuppa di pesce", 15.9, "Traditionelle italienische Meeresfrüchtesuppe mit Riesengarnelen, Tintenfisch, Miesmuscheln, Muscheln, Shrimps und Baby-Oktopus", "B,D,L,O,R"],

  ["Vorspeisen", "Bruschetta con pomodori", 10.9, "Geröstetes Hausbrot mit Tomaten, Knoblauch, Basilikum und Olivenöl", "A"],
  ["Vorspeisen", "Mozzarella caprese", 8.9, "Mozzarella mit Tomatenscheiben, Basilikumpesto und Olivenöl extra vergine", "G"],
  ["Vorspeisen", "Burratina", 16.9, "Burrata mit Kirschtomaten, Rucola, Pesto di pistacchio und Olivenöl extra vergine", "G,H"],
  ["Vorspeisen", "Pane de la casa", 5.9, "Hausgemachtes Brot mit Rosmarin oder Knoblauch", "A"],
  ["Vorspeisen", "Rucola e grana", 10.9, "Rucola, Grana, Kirschtomaten und Olivenöl", "G"],
  ["Vorspeisen", "Antipasti Ricoberto", 18.9, "Gegrillte Melanzani und Zucchini mit Bufala, Rucola, Parmesan, Oliven, Artischocken und Prosciutto cotto", "G"],

  ["Pizza", "Marinara", 9.9, "Tomatensauce, Oregano, Knoblauchstücke, Basilikum", "A", true],
  ["Pizza", "Margherita", 10.9, "Tomatensauce, Mozzarella, Basilikum", "A,G", true],
  ["Pizza", "Diavola", 11.9, "Tomatensauce, Mozzarella, Prosciutto cotto, scharfe Pfefferoni, Chiliöl", "A,G", true],
  ["Pizza", "Cardinale", 11.9, "Tomatensauce, Mozzarella, Prosciutto cotto", "A,G", true],
  ["Pizza", "Carciofi", 11.9, "Tomatensauce, Mozzarella, Artischocken, Oliven", "A,G", true],
  ["Pizza", "Funghi", 12.5, "Tomatensauce, Mozzarella, Champignons", "A,G", true],
  ["Pizza", "Ortolana", 12.5, "Tomatensauce, Mozzarella, verschiedene Gemüsesorten der Saison", "A,G", true],
  ["Pizza", "Calabrese", 12.9, "Tomatensauce, Mozzarella, scharfe Salami, Oliven, scharfe Pfefferoni", "A,G", true],
  ["Pizza", "Contadina", 12.9, "Tomatensauce, Mozzarella, Kochschinken, Zwiebeln, milde Pfefferoni", "A,G", true],
  ["Pizza", "Tonno", 12.9, "Tomatensauce, Mozzarella, Thunfisch, Zwiebeln", "A,D,G", true],
  ["Pizza", "Salame", 12.9, "Tomatensauce, Mozzarella, Salami", "A,G", true],
  ["Pizza", "Provinciale", 12.9, "Tomatensauce, Mozzarella, Prosciutto cotto, Mais, milde Pfefferoni", "A,G", true],
  ["Pizza", "Prosciutto e funghi", 12.9, "Tomatensauce, Mozzarella, Prosciutto cotto, Champignons", "A,G", true],
  ["Pizza", "Quattro formaggi", 13.4, "Tomatensauce, Mozzarella, Gorgonzola, Grana, Ricotta", "A,G", true],
  ["Pizza", "Capricciosa", 13.5, "Tomatensauce, Mozzarella, Kochschinken, Artischocken, Champignons, Oliven", "A,G", true],
  ["Pizza", "Salame piccante", 13.7, "Tomatensauce, Mozzarella, scharfe Salami", "A,G", true],
  ["Pizza", "Zucchine", 13.9, "Tomatensauce, Mozzarella, Zucchini, Oliven", "A,G", true],
  ["Pizza", "Mafiosi", 13.9, "Sauerrahm, Mozzarella, Kirschtomaten, Rucola", "A,G", true],
  ["Pizza", "Melanzane", 14.9, "Tomatensauce, Mozzarella, Melanzani, Oliven, Kirschtomaten, Parmesan, Basilikum", "A,G", true],
  ["Pizza", "Bianca", 14.9, "Mozzarella, Mozzarella di bufala, Parmesan, Basilikum, Olivenöl extra vergine", "A,G", true],
  ["Pizza", "Ricoberto", 14.9, "Tomatensauce, Mozzarella, Schinken, Salami, Zwiebeln, Champignons", "A,G", true],
  ["Pizza", "Domibertino", 14.9, "Mozzarella di bufala, Kirschtomaten, Basilikum, Olivenöl", "A,G", true],
  ["Pizza", "Bufala", 14.9, "Tomaten, Mozzarella di bufala, Kirschtomaten, Basilikum, Olivenöl", "A,G", true],
  ["Pizza", "Pisa", 14.9, "Tomatensauce, Mozzarella, Prosciutto cotto, Rucola, Cherrytomaten, Parmesan", "A,G", true],
  ["Pizza", "Burrata", 15.9, "Tomatensauce, Burrata, Kirschtomaten, Olivenöl, Basilikum", "A,G", true],
  ["Pizza", "Tartofu", 15.9, "Mozzarella, Tartufata, Champignons, Basilikum", "A,G", true],
  ["Pizza", "Burrata e prosciutto cotto", 15.9, "Mozzarella, Burrata, Prosciutto cotto, Pesto di pistacchio, Basilikum, Olivenöl extra vergine", "A,G,H", true],
  ["Pizza", "Frutti di mare", 17.9, "Tomatensauce, Mozzarella, Riesengarnelen, Tintenfisch, Miesmuscheln, Muscheln, Shrimps und Baby-Oktopus", "A,B,G,R", true],

  ["Pane fatto in casa", "Ripieno di tonno e cipolla", 10.9, "Hausgemachtes gefülltes Brot mit Thunfisch und Zwiebeln", "A,D"],
  ["Pane fatto in casa", "Ripieno di prosciutto cotto", 10.9, "Hausgemachtes gefülltes Brot mit Prosciutto cotto", "A"],
  ["Pane fatto in casa", "Ripieno di feta e spinaci", 10.9, "Hausgemachtes gefülltes Brot mit Feta und Spinat", "A,G"],
  ["Pane fatto in casa", "Ripieno di salame e mozzarella", 10.9, "Hausgemachtes gefülltes Brot mit Salami und Mozzarella", "A,G"],

  ["Pasta", "Linguine alla bolognese", 12.9, "Linguine mit hausgemachter Fleischsauce", "A,L"],
  ["Pasta", "Spaghetti alla carbonara", 12.4, "Spaghetti mit Speck, Ei, Grana und Pfeffer", "A,C,G"],
  ["Pasta", "Spaghetti al pomodoro con burrata", 14.9, "Kirschtomaten, Burrata und Oliven", "A,G"],
  ["Pasta", "Linguine al frutti di mare", 18.9, "Linguine mit Riesengarnelen, Tintenfisch, Miesmuscheln, Muscheln, Shrimps und Baby-Oktopus", "A,B,R"],
  ["Pasta", "Spaghetti aglio e olio", 11.9, "Spaghetti mit Knoblauch, Olivenöl, Chili und Petersilie", "A"],
  ["Pasta", "Gnocchi alla sorrentina", 13.9, "Tomatensauce, Mozzarella und Parmesan", "A,C,G"],
  ["Pasta", "Linguine al gamberoni", 16.9, "Linguine mit Garnelen, Knoblauch, Kirschtomaten und Petersilie", "A,B"],
  ["Pasta", "Linguine all'arrabbiata (scharf)", 12.4, "Linguine mit scharfer Tomatensauce, Knoblauch und Chili", "A"],
  ["Pasta", "Penne al pollo piccante", 14.8, "Tomatensauce, Hühnerbrust, Paprika, Oregano und Chili", "A"],

  ["Salate", "Insalata verde", 6.0, "Grüner Salat, Olivenöl und Balsamico", "O"],
  ["Salate", "Insalata mista", 10.9, "Eisbergsalat, Tomaten, Zwiebeln, Gurken, Mais, Oliven, Olivenöl und Balsamico", "O"],
  ["Salate", "Insalata con prosciutto", 14.5, "Gemischter Salat, Prosciutto cotto, Olivenöl und Balsamico", "O"],
  ["Salate", "Insalata di tonno", 13.9, "Gemischter Salat, Thunfisch, Zwiebeln, Oliven, Olivenöl und Balsamico", "D,O"],
  ["Salate", "Insalata Ricoberto", 15.9, "Gemischter Salat, gegrillte Hühnerbrust, gegrillte Champignons, Olivenöl und Balsamico", "O"],
  ["Salate", "Insalata greca", 14.2, "Gemischter Salat mit Feta", "G"],
  ["Salate", "Insalata del pescatore", 18.9, "Gemischter Salat mit Riesengarnelen, Tintenfisch, Miesmuscheln, Muscheln, Shrimps und Baby-Oktopus; Olivenöl", "B,R"],

  ["Fisch", "Scampi alla griglia", 21.9, "7 Stk. Riesengarnelen mit Beilagensalat und Pane de la casa", "A,B,O"],

  ["Al forno", "Parmigiana di zucchine", 13.7, "Bolognese, Zucchini und Parmigiano", "G,L"],
  ["Al forno", "Broccoli al forno", 13.9, "Brokkoli mit Rahmsauce", "G"],
  ["Al forno", "Lasagne al forno", 13.9, "Lasagne mit Bolognese, Béchamelsauce und Käse", "A,C,G,L"],
  ["Al forno", "Gnocchi quattro formaggi al forno", 13.9, "Gnocchi mit vier Käsesorten, mit Parmigiano überbacken", "A,C,G"],

  ["Dolce", "Tiramisù", 6.7, "Hausgemacht, mit Mascarpone und Espresso", "A,C,G"],
  ["Dolce", "Panna cotta", 5.9, "Mit Himbeersauce", "G"],
  ["Dolce", "Pane della casa alla Nutella", 11.9, "Hausbrot mit Nutella", "A,F,G,H"],

  ["Getränke", "Coca-Cola / Zero 0,33 l", 2.9, "", ""],
  ["Getränke", "Fanta 0,33 l", 2.9, "", ""],
  ["Getränke", "Sprite 0,33 l", 2.9, "", ""],
  ["Getränke", "Almdudler 0,33 l", 2.9, "", ""],
  ["Getränke", "Eistee Zitrone / Pfirsich 0,33 l", 2.9, "", ""],
  ["Getränke", "Mineralwasser mit / ohne 0,5 l", 2.9, "", ""],
];

const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const MENU: MenuItem[] = RAW.map(([category, name, price, description, allergens, pizza]) => ({
  id: `${slug(category)}--${slug(name)}`,
  category,
  name,
  price,
  description,
  allergens,
  pizza: pizza ?? false,
}));

export const MENU_BY_ID: Record<string, MenuItem> = Object.fromEntries(MENU.map((m) => [m.id, m]));

export const ALLERGENS: Record<string, string> = {
  A: "Glutenhaltiges Getreide",
  B: "Krebstiere",
  C: "Eier",
  D: "Fisch",
  E: "Erdnüsse",
  F: "Sojabohnen",
  G: "Milch & Laktose",
  H: "Schalenfrüchte / Nüsse",
  L: "Sellerie",
  M: "Senf",
  N: "Sesam",
  O: "Sulfite",
  P: "Lupinen",
  R: "Weichtiere",
};
