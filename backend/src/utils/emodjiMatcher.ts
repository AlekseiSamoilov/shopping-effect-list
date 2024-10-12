import natural from 'natural'

const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

const emojiCategories = {
    фрукты: ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍒', '🍑', '🥝', '🍍', '🥭', '🍎', '🫐'],
    овощи: ['🥕', '🌽', '🥔', '🍅', '🥒', '🥬', '🥦', '🧄', '🧅', '🍆', '🫑', '🥜', '🌶️', '🫚', '🫛'],
    мясо: ['🍗', '🍖', '🥩', '🥓', '🍔', '🌭', '🍤', '🦴'],
    рыба: ['🐟', '🍣', '🍤', '🦐', '🦑', '🦀', '🐙'],
    молочные: ['🥛', '🧀', '🍦', '🥚', '🧈', '🫙', '🧉'],
    хлеб: ['🍞', '🥐', '🥖', '🥨', '🥯', '🥞', '🧇'],
    напитки: ['☕', '🍵', '🥤', '🧃', '🍺', '🍷', '🍹', '🥛', '🧋', '🍶', '🍾'],
    сладости: ['🍬', '🍭', '🍫', '🍿', '🍩', '🍪', '🎂', '🧁', '🥮'],
    закуски: ['🥨', '🥠', '🥟', '🍕', '🌯', '🌮', '🥙', '🧆', '🥪'],
    крупы: ['🍚', '🍜', '🍝', '🍲', '🫕', '🥣'],
    соусы: ['🧂', '🧈', '🧄', '🧅'],
    консервы: ['🥫'],
    замороженные: ['🧊', '🍨'],
    гигиена: ['🧼', '🧽', '🧴', '🪥', '🧻'],
    косметика: ['💄', '💅', '🧴', '🖌️'],
    бытовая_химия: ['🧹', '🧺', '🧼', '🧽'],
    товары_для_дома: ['🛋️', '🪑', '🛏️', '🪞', '🚪', '💡'],
    электроника: ['📱', '💻', '🖥️', '🖨️', '📷', '🎧'],
    одежда: ['👕', '👖', '🧦', '🧣', '🧤', '👗', '👘'],
    обувь: ['👞', '👟', '👠', '👡', '🥾', '🥿'],
    канцтовары: ['✏️', '📏', '📐', '📌', '📔', '📕'],
    другое: ['🛒', '🛍️', '📦', '🧳', '🔋', '💊']
};

const categoryKeywords = {
    фрукты: ['фрукты', 'яблоко', 'груша', 'апельсин', 'лимон', 'банан', 'арбуз', 'виноград', 'клубника', 'вишня', 'персик', 'киви', 'ананас', 'манго', 'черника', 'малина', 'абрикос', 'слива', 'грейпфрут', 'гранат'],
    овощи: ['овощи', 'морковь', 'кукуруза', 'картофель', 'помидор', 'огурец', 'капуста', 'брокколи', 'чеснок', 'лук', 'баклажан', 'перец', 'тыква', 'кабачок', 'редис', 'свекла', 'горох', 'фасоль', 'салат', 'шпинат'],
    мясо: ['мясо', 'курица', 'говядина', 'свинина', 'бекон', 'бургер', 'сосиска', 'колбаса', 'ветчина', 'индейка', 'баранина', 'котлеты', 'фарш', 'стейк', 'шашлык'],
    рыба: ['рыба', 'лосось', 'тунец', 'треска', 'сельдь', 'карп', 'окунь', 'форель', 'икра', 'креветки', 'кальмар', 'краб', 'осьминог', 'мидии', 'рыбные палочки'],
    молочные: ['молоко', 'сыр', 'мороженое', 'яйца', 'йогурт', 'творог', 'сметана', 'кефир', 'масло', 'сливки', 'ряженка', 'простокваша', 'молочный коктейль'],
    хлеб: ['хлеб', 'булочка', 'багет', 'крендель', 'бублик', 'лаваш', 'лепешка', 'пита', 'тортилья', 'сухари', 'батон', 'пирожок', 'пончик', 'круассан'],
    напитки: ['кофе', 'чай', 'сок', 'газировка', 'пиво', 'вино', 'коктейль', 'вода', 'лимонад', 'квас', 'компот', 'смузи', 'энергетик', 'молочный коктейль'],
    сладости: ['конфеты', 'леденцы', 'шоколад', 'попкорн', 'пончики', 'печенье', 'торт', 'кекс', 'пирожное', 'зефир', 'мармелад', 'вафли', 'пастила', 'халва'],
    закуски: ['чипсы', 'орешки', 'сухарики', 'крекеры', 'снэки', 'попкорн', 'начос', 'гренки', 'семечки', 'оливки', 'маслины'],
    крупы: ['рис', 'гречка', 'овсянка', 'пшено', 'кускус', 'булгур', 'киноа', 'перловка', 'манка', 'хлопья'],
    соусы: ['кетчуп', 'майонез', 'горчица', 'соевый соус', 'сальса', 'песто', 'тартар', 'барбекю', 'чили', 'сырный соус'],
    консервы: ['тушенка', 'сайра', 'шпроты', 'горошек', 'кукуруза', 'фасоль', 'ананасы', 'персики', 'оливки', 'томатная паста'],
    замороженные: ['пельмени', 'вареники', 'пицца', 'мороженое', 'овощная смесь', 'ягоды', 'котлеты', 'блинчики', 'рыба'],
    гигиена: ['мыло', 'шампунь', 'зубная паста', 'дезодорант', 'туалетная бумага', 'салфетки', 'гель для душа', 'лосьон', 'бритва', 'прокладки'],
    косметика: ['помада', 'тушь', 'тени', 'крем', 'лак для ногтей', 'тональный крем', 'пудра', 'румяна', 'бальзам для губ'],
    бытовая_химия: ['стиральный порошок', 'средство для мытья посуды', 'чистящее средство', 'освежитель воздуха', 'отбеливатель', 'кондиционер для белья', 'средство от накипи'],
    товары_для_дома: ['полотенце', 'постельное белье', 'подушка', 'одеяло', 'ваза', 'рамка', 'свечи', 'батарейки', 'лампочка', 'удлинитель'],
    электроника: ['наушники', 'зарядное устройство', 'флешка', 'карта памяти', 'чехол для телефона', 'мышка', 'клавиатура', 'веб-камера'],
    одежда: ['футболка', 'джинсы', 'носки', 'шарф', 'перчатки', 'платье', 'куртка', 'свитер', 'шорты', 'нижнее белье'],
    обувь: ['кроссовки', 'туфли', 'сандалии', 'ботинки', 'сапоги', 'тапочки', 'шлепанцы', 'кеды'],
    канцтовары: ['ручка', 'карандаш', 'линейка', 'ластик', 'тетрадь', 'блокнот', 'маркер', 'степлер', 'скотч', 'калькулятор'],
    другое: ['подарок', 'открытка', 'упаковка', 'зонт', 'рюкзак', 'сумка', 'чемодан', 'газета', 'журнал', 'лекарства']
};

export const findEmoji = (item: string): string => {
    const tokens = tokenizer.tokenize(item.toLowerCase());
    const stems = tokens.map(token => stemmer.stem(token));

    for (const [category, keywords] of Object.entries(categoryKeywords)) {
        const stemmedKeywords = keywords.map(keywords => stemmer.stem(keywords));
        if (stems.some(stem => stemmedKeywords.includes(stem))) {
            return emojiCategories[category as keyof typeof emojiCategories][
                Math.floor(Math.random() * emojiCategories[category as keyof typeof emojiCategories].length)
            ];
        }
    }
    return '🛒';
}