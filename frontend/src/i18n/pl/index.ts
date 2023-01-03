import type { BaseTranslation } from "../i18n-types.js";

const pl: BaseTranslation = {
  general: {
    submit: "Potwierdź",
    cancel: "Cofnij",
    edit: "Edytuj",
    delete: "Usuń",
    confirm: "Potwierdź",
    close: "Zamknij",
    accept: "Zaakceptuj",
    decline: "Odrzuć",
    nothingFound: "Nic nie znaleziono",
    activate: "Aktywuj",
    ok: "Ok",
  },
  links: {
    homepage: "Strona główna",
    toys: "Zabawki",
    adminPage: "Strona admina",
    logout: "Wyloguj",
    login: "Zaloguj",
    register: "Zarejestruj",
  },
  filters: {
    filters: "Filtry",
    search: "Szukaj",
    searchByAny: "Szukaj po dowolnym polu",
    category: "Kategorie",
    allCategories: "Wszystkie kategorie",
  },
  categories: {
    figures: "Figurki",
    cars: "Samochody",
    radioControlled: "Sterowane zdalnie",
    construction: "Konstrukcyjne",
    educational: "Edukacyjne",
    electronic: "Elektroniczne",
    executive: "Zrób to sam",
    foodRelated: "Związane z jedzeniem",
    games: "Gry",
    puzzle: "Puzzle",
    lego: "Lego",
    science: "Nauka",
    sound: "Dźwięk",
    spinning: "Kręcące",
    wooden: "Drewniane",
    other: "Inne",
  },
  form: {
    email: "Email",
    password: "Hasło",
    confirmPassword: "Potwierdź hasło",
    name: "Imię",
    phone: "Numer telefonu",
    address: "Adres",
    photo: "Zdjęcie",
    description: "Opis",
    id: "Id",
    created: "Data utworzenia",
    updated: "Data aktualizacji",
    status: "Status",
    role: "Rola",
    toysNumber: "Liczba posiadanych zabawek",
    placeholder: {
      email: "twoj@email.com",
      password: "silneHaslo123",
      name: "Damian",
      phone: "999 999 999",
      address: "Lodz al. Politechniki 1",
      photo: "Zdjęcie",
      toy: {
        name: "McQueen",
        description: "Dobry stan",
      },
    },
  },
  login: {
    login: "Zaloguj się",
    welcomeBack: "Witaj ponownie!",
    noAccount: "Nie posiadasz konta?",
    reset: "Zresetuj hasło",
  },
  register: {
    register: "Zarejestruj się",
    welcome: "Witaj",
    alreadyHave: "Posiadasz juz konto?",
    terms: "Akceptuję regulamin",
    requirements: {
      number: "Zawiera liczby",
      lower: "Zawiera małą literę",
      upper: "Zawiera duza litere",
      special: "Zawiera symbol specjalny",
      characters: "Zawiera przynajmniej 6 znaków",
    },
  },
  profile: {
    details: {
      data: "Twoje dane",
      changePassword: "Zmień swoje hasło",
      rating: "Twoja ocena",
    },
    active: "Aktywne oferty",
    history: "Historia ofert",
    toys: {
      toys: "Twoje zabawki",
      new: "Dodaj nową",
    },
  },
  toy: {
    list: "Lista wszystkich zabawek",
    details: "Szczegóły zabawki",
    status:
      "{status|{ACTIVE: aktywna, FINISHED: zakończona, REPORTED: zgloszona}}",
    category:
      "{category|{FIGURES: FIGURKI, ANIMALS: ZWIERZĘTA, CARS: SAMOCHODY, RADIO_CONTROLLED: STEROWANE ZDALNIE, CONSTRUCTION: KONSTRUKCYJNE, CREATIVE: KREATYWNE, DOLLS: LALKI, EDUCATIONAL: EDUKACYJNE, ELECTRONIC: ELEKTRONICZNE, EXECUTIVE: ZRÓB TO SAM, FOOD_RELATED: ZWIĄZANE Z JEDZENIEM, GAMES: GRY, PLAYGOUND: PLAYGROUND, PUZZLE: PUZZLE, LEGO: LEGO, SCIENCE: NAUKA, SOUND: DŹWIĘK, SPINNING: KRĘCĄCE, WOODEN: DREWNIANE, OTHER: INNE}}",
    swap: {
      swap: "Wymień",
      selectOne: "Wybierz jedną z zabawek",
      notFound: "Nic tu nie ma",
      complete: "Wymiana zakończona",
      offer: "Oferta wymiany",
      tryingSwap: "Próbujesz się wymienić za",
      make: "Zaproponuj wymianę",
      noToys: "Nie masz zadnych aktywnych zabawek!",
      loginFirst: "Zaloguj się aby móc wymieniać zabawki",
      pleaseGo: "Przejdź",
      toProfile: "do swojego profilu",
      andAddToy: "i dodaj jakąś zabawkę aby móc wymieniać się z innymi!",
    },
    confirmDelete: {
      title: "Potwierdź swoją akcję",
      text: "Czy na pewno chcesz usunąć tę zabawkę? Ta operacja jest nieodwracalna.",
    },
    reportToy: {
      title: "Zgłoś tę zabawkę",
      text: "Czy na pewno chcesz zgłosić tę zabawkę?",
      yes: "Zgłoś zabawkę",
      no: "Nie, nie zgłaszaj",
    },
  },
  admin: {
    users: "Uzytkownicy",
    offers: "Oferty",
    reported: "Zgłoszone zabawki",
    name: "Imię",
    email: "Email",
    phone: "Numer telefonu",
    role: "Rola",
    status: "Status",
    userDetails: "Szczegóły uzytkownika",
    roles: "{role|{BASIC: UZYTKOWNIK, ADMIN: ADMINISTRATOR}}",
    statuses:
      "{status|{ACTIVE: AKTYWNY, BLOCKED: ZABLOKOWANY, UNCONFIRMED: NIEPOTWIERDZONY}}",
  },
  offer: {
    statuses:
      "{status|{ACCEPTED: ZAAKCEPTOWANA, DECLINED: ODRZUCONA, PENDING: OCZEKUJĄCA}}",
    senderRate: "Ocena wysyłającego",
    receiverRate: "Ocena odbierającego",
    yourRate: "Twoja ocena",
    rateUser: "Oceń uzytkownika",
    exchangeLike: "Jak podobał Ci się proces wymiany?",
    declineModal: {
      title: "Odrzuć ofertę",
      text: "Czy na pewno chcesz odrzucić tę ofertę? Ta akcja jest nieodwracalna.",
      no: "Nie, nie odrzucaj",
      yes: "Odrzuć ofertę",
    },
    confirmModal: {
      title: "Potwierdź swoją akcję",
      text: "Czy na pewno chcesz zaakceptować tę ofertę? Ta akcja jest nieodwracalna..",
    },
    sender: "Wysyłający",
    receiver: "Odbierający",
    yourToy: "Twoja zabawka",
    swapComplete: {
      title: "Wymiana ukończona",
      textIntr:
        "Dokonałeś wymiany za zabawkę w aplikacji, teraz skontaktuj się z osobą z którą się wymieniłeś aby dokończyć proces",
      textInfo: "Oto informacje o uzytkowniku z którym prowadzisz wymianę",
      textFinish:
        "Miej na uwadze, ze nie będziesz mógł juz wrócić do tego ekranu",
    },
  },
  // pomyślnie utworzono x
  notifications: {
    success: "Sukces",
    created: "{name: string} has been created",
    updated: "{name: string} has been updated",
    deleted: "{name: string} has been deleted",
    declined: "{name: string} has been declined",
    statusChanged: "Status został zmieniony",
    reported: "Zabawka została zgłoszona",
    resetPasswordEmail:
      "Jeśli twój email istnieje, wysłaliśmy ci link do zresetowania hasła",
    resetPasswordConfirmation: "Twoje hasło zostało zresetowane",
    error: "Błąd",
    generalError: "Coś poszło nie tak",
  },
  homepage: {
    titleMain: "Baw się & Wymieniaj & Powtarzaj",
    titleText:
      "Are you tired of your child's toys gathering dust and taking up space in your home? Look no further! Our platform allows you to swap toys with others, giving your child the opportunity to play with new toys while decluttering your home. Start browsing and swapping today!",
    // "Jesteś zmęczony"
    gettingStarted: "Zacznij teraz",
    features: {
      title1: "Szeroki wybór zabawek",
      description1:
        "Our toy swapping platform has a wide selection of toys to choose from, so you are sure to find something that your child will love.",
      title2: "Przejrzysty interfejs",
      description2:
        "Our platform is designed to be user-friendly, so you can easily browse, request, and list toys with just a few clicks.",
      title3: "Podobnie myśląca społeczność",
      description3:
        "You can connect with other parents who are looking to declutter their homes and give their children the opportunity to play with new toys",
    },
    faq: {
      title: "Często zadawane pytania",
      question1: "Jak dołączyć do społeczności wymieniających się?",
      answer1:
        "Aby dołączyć do społeczności, po prostu stwórz konto na naszej platformie i zacznij przeglądać dostępne zabawki do wymiany. Mozesz takze wystawiać własne zabawki do wymiany",
      question2: "Jak zaządać zabawki od innego uzytkownika?",
      answer2:
        "To request a toy from another user, simply click on the toy that you are interested in and follow the prompts to send a request to the owner. The owner will then have the option to accept or decline your request.",
      question3: "Jak wystawiać własne zabawki aby inni mogli ich zaządać?",
      answer3:
        "To list your own toys, click on the 'Add a toy' button and follow the prompts to upload a photo and description of the toy you want to list.",
      question4: "Jak dokonać wymiany zabawek?",
      answer4:
        "Once a request for a toy has been accepted, the two users can coordinate the details of the swap, such as where to meet or how to exchange the toys.",
      question5: "Czy jest jakaś opłata za korzystanie z platformy?",
      answer5:
        "There is no fee to use our toy swapping platform. It is completely free to join and list toys.",
    },
  },
};

export default pl;
