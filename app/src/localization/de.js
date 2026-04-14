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
        salon: {
          tabs: {
            services: "Dienstleistungen",
            appointment: "Termine",
            customers: "Kunden",
          },
          appointment: {
            availability: {
              title: "Verfügbarkeit festlegen",
              desc: "Wähle deine wiederkehrenden wöchentlichen Termine",
            },
            offDays: {
              title: "Freie Tage verwalten",
              desc: "Wähle bestimmte Daten im Kalender aus, um sie zu blockieren",
            },
          },
        },
        appointment: {
          tabs: {
            upcoming: "Bevorstehend",
            history: "Verlauf",
          },
          appointmentCard: {
            msg: "Nachricht",
            notify: "Benachrichtigen",
            serve: "Bedienen",
            cancel: "Abbrechen",
          },
          cancelled: "Storniert",
        },
        profile: {
          header: "Profil",
          options: {
            report: "Berichte",
            changeSalon: "Salon wechseln",
            helpAndSupport: "Hilfe & Support",
            about: "Über",
          },
          logout: "Abmelden",

          reports: {
            index: {
              header: "Berichte",
              options: {
                appointmentReports: "Terminberichte",
                queueReports: "Warteschlangenberichte",
              },
            },
            appointmentReport: {
              header: "Terminbericht",
              tabs: {
                daily: "Täglich",
                weekly: "Wöchentlich",
                monthly: "Monatlich",
              },
            },
            queueReport: {
              header: "Warteschlangenbericht",
              tabs: {
                daily: "Täglich",
                weekly: "Wöchentlich",
                monthly: "Monatlich",
              },
            },
            changeSalon: {
              header: "Salon wechseln",
              subHeader:
                "Wechsle deine aktive Verbindung, indem du einen Salon aus der Liste unten auswählst.",
              chooseSalon: "Wähle deinen Salon",
              confirm: "Bestätigen",
              cancel: "Abbrechen",
            },
          },
        },
        manageProfile: {
          header: "Konto verwalten",
          nameInput: {
            header: "Name",
            placeholder: "Gib deinen Namen ein",
          },
          genderDropdown: {
            header: "Geschlecht",
            placeholder: "Wähle dein Geschlecht",
            male: "Männlich",
            femaile: "Weiblich",
            other: "Andere",
          },
          dateOfBirth: {
            header: "Geburtsdatum (Optional)",
            placeholder: "TT/MM/JJJJ",
            close: "Schließen",
            done: "Fertig",
          },
          mobileNumber: {
            header: "Handynummer",
            update: "Aktualisieren",
          },
          editAndSave: "Bearbeiten & Speichern",
        },
      },
    },
    barber: {
      barbertabs: {
        home: {
          upComingAppointments: "Bevorstehende Termine",
          liveStatus: "Live-Status",
          activeStation: "Aktive Station",
          online: "Online",
          offline: "Offline",
          system: "System",
          on: "Ein",
          in: "In",
          booking: "Buchung",
          inQueue: "In Warteschlange",
          clock: "Uhr",

          card: {
            services: "Dienstleistungen",
            cancel: "Abbrechen",
            serve: "Bedienen",
          },

          reports: {
            header: "Wöchentliche Berichte",
            appointment: "Termine",
            completed: "Abgeschlossen",
            noShow: "Nicht erschienen",
            queueBookings: "Warteschlangen-Buchungen",
            served: "Bedient",
            cancelled: "Storniert",
            total: "Gesamt",
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
        salon: {
          tabs: {
            services: "Dienstleistungen",
            appointment: "Termine",
            customers: "Kunden",
          },
          description: "Beschreibung",
          contactUs: "Kontaktiere uns",
          ifYouHaveQues: "Wenn du Fragen hast",
          location: "Standort",
          followUsOn: "Folge uns auf",
          socialLinks: "Soziale Links",

          appointment: {
            availability: {
              title: "Verfügbarkeit festlegen",
              desc: "Wähle deine wiederkehrenden wöchentlichen Termine",
            },
            offDays: {
              title: "Freie Tage verwalten",
              desc: "Wähle bestimmte Daten im Kalender aus, um sie zu blockieren",
            },
          },
        },
        appointment: {
          tabs: {
            upcoming: "Bevorstehend",
            history: "Verlauf",
          },
          appointmentCard: {
            msg: "Nachricht",
            notify: "Benachrichtigen",
            serve: "Bedienen",
            cancel: "Abbrechen",
          },
          cancelled: "Storniert",
        },
        profile: {
          header: "Profil",
          options: {
            report: "Berichte",
            changeSalon: "Salon wechseln",
            helpAndSupport: "Hilfe & Support",
            about: "Über",
          },
          logout: "Abmelden",
        },
        manageProfile: {
          header: "Konto verwalten",
          nameInput: {
            header: "Name",
            placeholder: "Gib deinen Namen ein",
          },
          genderDropdown: {
            header: "Geschlecht",
            placeholder: "Wähle dein Geschlecht",
            male: "Männlich",
            femaile: "Weiblich",
            other: "Andere",
          },
          dateOfBirth: {
            header: "Geburtsdatum (Optional)",
            placeholder: "TT/MM/JJJJ",
            close: "Schließen",
            done: "Fertig",
          },
          mobileNumber: {
            header: "Handynummer",
            update: "Aktualisieren",
          },
          editAndSave: "Bearbeiten & Speichern",
        },
      },
    },
  },
};
