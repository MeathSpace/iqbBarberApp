export default {
  index: {
    header: "Willkommen bei iQBook",
    subHeader:
      "Für Administratoren und Friseure entwickelt — verwalten Sie Ihre Warteschlangen und Termine reibungslos, alles an einem Ort!",
    admin: "Administrator",
    barber: "Friseur",
  },

  auth: {
    adminauth: {
      signin: {
        header: "Admin-Anmeldung",
        subHeader: "Willkommen zurück! Bitte geben Sie Ihre Daten ein.",
        emailInput: {
          header: "E-Mail",
          placeholder: "Geben Sie Ihre E-Mail ein",
        },
        passwordInput: {
          header: "Passwort",
          placeholder: "Geben Sie Ihr Passwort ein",
        },
        rememberMe: "Angemeldet bleiben",
        signIn: "Anmelden",
        or: "oder",
        dontHaveAccount: "Haben Sie noch kein Konto?",
        signUp: "Registrieren",

        errorStatesAndApi: {
          emailRequired: "E-Mail ist erforderlich",
          InvalidEmailFormat: "Ungültiges E-Mail-Format",
          passwordRequired: "Passwort ist erforderlich",
          passwordMostCharecters: "Das Passwort muss 8 Zeichen lang sein",
        },
      },
      signup: {
        header: "Konto erstellen",
        subHeader: "Lassen Sie uns Sie bei iQBook starten.",
        emailInput: {
          header: "E-Mail",
          placeholder: "Geben Sie Ihre E-Mail ein",
        },
        passwordInput: {
          header: "Passwort",
          placeholder: "Geben Sie Ihr Passwort ein",
        },
        signUp: "Registrieren",
        or: "oder",
        alreadyHaveAccount: "Haben Sie bereits ein Konto?",
        signIn: "Anmelden",
      },
      signupotp: {
        header: "OTP eingeben",
        subHeader:
          "Wir haben einen 4-stelligen Code an Ihre E-Mail gesendet, um Ihr Konto zu verifizieren.",
        verificationInput: {
          header: "Bestätigungscode",
          placeholder: "Geben Sie Ihren OTP ein",
        },
        verify: "Bestätigen",
        didntReceiveCode: "Code nicht erhalten?",
        resend: "Erneut senden",
      },
      accountDetails: {
        header: "Kontodetails",
        subHeader:
          "Diese Angaben helfen uns, Sie besser zu bedienen. Sie können diesen Schritt auch überspringen und später aktualisieren!",
        skip: "Überspringen",
        nameInput: {
          header: "Name",
          placeholder: "Geben Sie Ihren Namen ein",
        },
        genderDropdown: {
          header: "Geschlecht",
          placeholder: "Wählen Sie Ihr Geschlecht",
          male: "Männlich",
          femaile: "Weiblich",
          other: "Andere",
        },
        dateOfBirth: {
          header: "Geburtsdatum (optional)",
          placeholder: "TT/MM/JJJJ",
          close: "Schließen",
          done: "Fertig",
        },
        mobileNumber: {
          header: "Mobilnummer",
          update: "Aktualisieren",
        },
      },
    },

    barberauth: {
      signin: {
        header: "Friseur-Anmeldung",
        subHeader: "Willkommen zurück! Bitte geben Sie Ihre Daten ein.",
        emailInput: {
          header: "E-Mail",
          placeholder: "Geben Sie Ihre E-Mail ein",
        },
        passwordInput: {
          header: "Passwort",
          placeholder: "Geben Sie Ihr Passwort ein",
        },
        rememberMe: "Angemeldet bleiben",
        signIn: "Anmelden",
        or: "oder",
        dontHaveAccount: "Haben Sie noch kein Konto?",
        signUp: "Registrieren",

        errorStatesAndApi: {
          emailRequired: "E-Mail ist erforderlich",
          InvalidEmailFormat: "Ungültiges E-Mail-Format",
          passwordRequired: "Passwort ist erforderlich",
          passwordMostCharecters: "Das Passwort muss 8 Zeichen lang sein",
        },
      },
      signup: {
        header: "Konto erstellen",
        subHeader: "Lassen Sie uns Sie bei iQBook starten.",
        emailInput: {
          header: "E-Mail",
          placeholder: "Geben Sie Ihre E-Mail ein",
        },
        passwordInput: {
          header: "Passwort",
          placeholder: "Geben Sie Ihr Passwort ein",
        },
        signUp: "Registrieren",
        or: "oder",
        alreadyHaveAccount: "Haben Sie bereits ein Konto?",
        signIn: "Anmelden",
      },
      signupotp: {
        header: "OTP eingeben",
        subHeader:
          "Wir haben einen 4-stelligen Code an Ihre E-Mail gesendet, um Ihr Konto zu verifizieren.",
        verificationInput: {
          header: "Bestätigungscode",
          placeholder: "Geben Sie Ihren OTP ein",
        },
        verify: "Bestätigen",
        didntReceiveCode: "Code nicht erhalten?",
        resend: "Erneut senden",
      },
      accountDetails: {
        header: "Kontodetails",
        subHeader:
          "Diese Angaben helfen uns, Sie besser zu bedienen. Sie können diesen Schritt auch überspringen und später aktualisieren!",
        skip: "Überspringen",
        nameInput: {
          header: "Name",
          placeholder: "Geben Sie Ihren Namen ein",
        },
        genderDropdown: {
          header: "Geschlecht",
          placeholder: "Wählen Sie Ihr Geschlecht",
          male: "Männlich",
          femaile: "Weiblich",
          other: "Andere",
        },
        dateOfBirth: {
          header: "Geburtsdatum (optional)",
          placeholder: "TT/MM/JJJJ",
          close: "Schließen",
          done: "Fertig",
        },
        mobileNumber: {
          header: "Mobilnummer",
          update: "Aktualisieren",
        },
      },
    },
  },

  app: {
    admin: {
      admintabs: {
        home: {
          header: {
            name: "Jessica",
            salonName: "Modern Stylist Salon",
          },

          salonCard: {
            title: "Modern Stylist Salon",
            subtitle: "Ihr Ziel für moderne Haarpflege.",
            statusLabel: "Salonstatus",
            open: "Geöffnet",
          },

          sections: {
            liveStatus: "Live-Status",
            weeklyReports: "Wöchentliche Berichte",
          },

          status: {
            inQueue: "In der Warteschlange",
            appointment: "Termin",
            onDuty: "Im Dienst",
            customer: "Kunden",
          },

          reports: {
            appointments: {
              title: "Termine",
              total: "32 Gesamt",
              completed: "Abgeschlossen",
              noShows: "Nicht erschienen",
            },
            queueBookings: {
              title: "Warteschlangenbuchungen",
              total: "48 Gesamt",
              served: "Bedient",
              cancelled: "Storniert",
            },
          },
        },

        queue: {
          tabs: {
            liveQueue: "Live-Warteschlange",
            history: "Verlauf",
          },

          liveQueue: {
            header: {
              barber: "Friseur",
              customer: "Kunde",
              posWait: "Pos / Wartezeit",
            },
          },

          history: {
            header: {
              barber: "Friseur",
              customer: "Kunde",
              wait: "Wartezeit",
              status: "Status",
            },

            status: {
              served: "Bedient",
              waiting: "Wartend",
              cancelled: "Storniert",
            },
          },
        },
      },
    },
  },
};
