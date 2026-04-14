export default {
  index: {
    header: "Welcome to iQBook",
    subHeader:
      "Made for Admins and Barbers — manage your queues and appointments smoothly, all in one place !",
    admin: "Admin",
    barber: "Barber",
  },

  auth: {
    adminauth: {
      signin: {
        header: "Admin Login",
        subHeader: "Welcome back! Please enter your details.",
        emailInput: {
          header: "Email",
          placeholder: "Enter your email",
        },
        passwordInput: {
          header: "Password",
          placeholder: "Enter your password",
        },
        rememberMe: "Remember me",
        signIn: "Sign In",
        or: "or",
        dontHaveAccount: "Don't have an account ?",
        signUp: "Sign up",

        errorStatesAndApi: {
          emailRequired: "Email is required",
          InvalidEmailFormat: "Invalid email format",
          passwordRequired: "Password is required",
          passwordMostCharecters: "Password must be 8 charecters",
        },
      },
      signup: {
        header: "Create an Account",
        subHeader: "Let's get you started with iQBook.",
        emailInput: {
          header: "Email",
          placeholder: "Enter your email",
        },
        passwordInput: {
          header: "Password",
          placeholder: "Enter your password",
        },
        signUp: "Sign Up",
        or: "or",
        alreadyHaveAccount: "Already have an account ?",
        signIn: "Sign in",
      },
      signupotp: {
        header: "Enter OTP",
        subHeader:
          "We've sent a 4-digit code to your email to verify your account.",
        verificationInput: {
          header: "Verification Code",
          placeholder: "Enter your otp",
        },
        verify: "Verify",
        didntReceiveCode: "Didn't receive the code ?",
        resend: "Resend",
      },
      accountDetails: {
        header: "Account Details",
        subHeader:
          "Filling this helps us serve you better. You can also skip and update anytime!",
        skip: "Skip",
        nameInput: {
          header: "Name",
          placeholder: "Enter your name",
        },
        genderDropdown: {
          header: "Gender",
          placeholder: "Select your gender",
          male: "Male",
          femaile: "Female",
          other: "Other",
        },
        dateOfBirth: {
          header: "Date of Birth (Optional)",
          placeholder: "DD/MM/YYYY",
          close: "Close",
          done: "Done",
        },
        mobileNumber: {
          header: "Mobile Number",
          update: "Update",
        },
      },
    },
    barberauth: {
      signin: {
        header: "Barber Login",
        subHeader: "Welcome back! Please enter your details.",
        emailInput: {
          header: "Email",
          placeholder: "Enter your email",
        },
        passwordInput: {
          header: "Password",
          placeholder: "Enter your password",
        },
        rememberMe: "Remember me",
        signIn: "Sign In",
        or: "or",
        dontHaveAccount: "Don't have an account ?",
        signUp: "Sign up",

        errorStatesAndApi: {
          emailRequired: "Email is required",
          InvalidEmailFormat: "Invalid email format",
          passwordRequired: "Password is required",
          passwordMostCharecters: "Password must be 8 charecters",
        },
      },
      signup: {
        header: "Create an Account",
        subHeader: "Let's get you started with iQBook.",
        emailInput: {
          header: "Email",
          placeholder: "Enter your email",
        },
        passwordInput: {
          header: "Password",
          placeholder: "Enter your password",
        },
        signUp: "Sign Up",
        or: "or",
        alreadyHaveAccount: "Already have an account ?",
        signIn: "Sign in",
      },
      signupotp: {
        header: "Enter OTP",
        subHeader:
          "We've sent a 4-digit code to your email to verify your account.",
        verificationInput: {
          header: "Verification Code",
          placeholder: "Enter your otp",
        },
        verify: "Verify",
        didntReceiveCode: "Didn't receive the code ?",
        resend: "Resend",
      },
      accountDetails: {
        header: "Account Details",
        subHeader:
          "Filling this helps us serve you better. You can also skip and update anytime!",
        skip: "Skip",
        nameInput: {
          header: "Name",
          placeholder: "Enter your name",
        },
        genderDropdown: {
          header: "Gender",
          placeholder: "Select your gender",
          male: "Male",
          femaile: "Female",
          other: "Other",
        },
        dateOfBirth: {
          header: "Date of Birth (Optional)",
          placeholder: "DD/MM/YYYY",
          close: "Close",
          done: "Done",
        },
        mobileNumber: {
          header: "Mobile Number",
          update: "Update",
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
            subtitle: "Your destination for modern hair care.",
            statusLabel: "Salon Status",
            open: "Open",
          },

          sections: {
            liveStatus: "Live Status",
            weeklyReports: "Weekly Reports",
          },

          status: {
            inQueue: "In Queue",
            appointment: "Appointment",
            onDuty: "On Duty",
            customer: "Customer",
          },

          reports: {
            appointments: {
              title: "Appointments",
              total: "32 Total",
              completed: "Completed",
              noShows: "No-Shows",
            },
            queueBookings: {
              title: "Queue Bookings",
              total: "48 Total",
              served: "Served",
              cancelled: "Cancelled",
            },
          },
        },
        queue: {
          tabs: {
            liveQueue: "Live Queue",
            history: "History",
          },

          liveQueue: {
            header: {
              barber: "Barber",
              customer: "Customer",
              posWait: "Pos / Wait",
            },
          },

          history: {
            header: {
              barber: "Barber",
              customer: "Customer",
              wait: "Wait",
              status: "Status",
            },

            status: {
              served: "Served",
              waiting: "Waiting",
              cancelled: "Cancelled",
            },
          },
        },
        salon: {
          tabs: {
            services: "Services",
            appointment: "Appointment",
            customers: "Customers",
          },
          appointment: {
            availability: {
              title: "Set Your Availability",
              desc: "Choose your recurring weekly appointment days",
            },
            offDays: {
              title: "Manage Your Off Days",
              desc: "Select specific dates from a calendar to block off",
            },
          },
        },
        appointment: {
          tabs: {
            upcoming: "Upcoming",
            history: "History",
          },
          appointmentCard: {
            msg: "Msg",
            notify: "Notify",
            serve: "Serve",
            cancel: "Cancel",
          },
          cancelled: "cancelled",
        },
        profile: {
          header: "Profile",
          options: {
            report: "Report",
            changeSalon: "Change Salon",
            helpAndSupport: "Help & Support",
            about: "About",
          },
          logout: "Log Out",

          reports: {
            index: {
              header: "Reports",
              options: {
                appointmentReports: "Appointment Reports",
                queueReports: "Queue Reports",
              },
            },
            appointmentReport: {
              header: "Appointment Report",
              tabs: {
                daily: "Daily",
                weekly: "Weekly",
                monthly: "Monthly",
              },
            },
            queueReport: {
              header: "Queue Report",
              tabs: {
                daily: "Daily",
                weekly: "Weekly",
                monthly: "Monthly",
              },
            },
            changeSalon: {
              header: "Change Salon",
              subHeader:
                "Switch your active connection by selecting a salon from the list below.",
              chooseSalon: "Choose your salon",
              confirm: "Confirm",
              cancel: "Cancel",
            },
          },
        },
        manageProfile: {
          header: "Manage Account",
          nameInput: {
            header: "Name",
            placeholder: "Enter your name",
          },
          genderDropdown: {
            header: "Gender",
            placeholder: "Select your gender",
            male: "Male",
            femaile: "Female",
            other: "Other",
          },
          dateOfBirth: {
            header: "Date of Birth (Optional)",
            placeholder: "DD/MM/YYYY",
            close: "Close",
            done: "Done",
          },
          mobileNumber: {
            header: "Mobile Number",
            update: "Update",
          },
          editAndSave: "Edit & Save",
        },
      },
    },
    barber: {
      barbertabs: {
        home: {
          upComingAppointments: "Upcoming Appointments",
          liveStatus: "Live Status",
          activeStation: "Active Station",
          online: "Online",
          offline: "Offline",
          system: "System",
          on: "On",
          in: "In",
          booking: "Booking",
          inQueue: "In Queue",
          clock: "Clock",

          card: {
            services: "Services",
            cancel: "Cancel",
            serve: "Serve",
          },
          reports: {
            header: "Weekly Reports",
            appointment: "Appointments",
            completed: "Completed",
            noShow: "No-Shows",
            queueBookings: "Queue Bookings",
            served: "Served",
            cancelled: "Cancelled",
            total: "Total",
          },
        },
        queue: {
          tabs: {
            liveQueue: "Live Queue",
            history: "History",
          },

          liveQueue: {
            header: {
              barber: "Barber",
              customer: "Customer",
              posWait: "Pos / Wait",
            },
          },

          history: {
            header: {
              barber: "Barber",
              customer: "Customer",
              wait: "Wait",
              status: "Status",
            },

            status: {
              served: "Served",
              waiting: "Waiting",
              cancelled: "Cancelled",
            },
          },
        },
        salon: {
          tabs: {
            services: "Services",
            appointment: "Appointment",
            customers: "Customers",
          },
          description:"Description",
          contactUs: "Contact Us",
          ifYouHaveQues: "If you have any questions",
          location: "Location",
          followUsOn: "Follow Us On",
          socialLinks: "Social links",
          appointment: {
            availability: {
              title: "Set Your Availability",
              desc: "Choose your recurring weekly appointment days",
            },
            offDays: {
              title: "Manage Your Off Days",
              desc: "Select specific dates from a calendar to block off",
            },
          },
        },
        appointment: {
          tabs: {
            upcoming: "Upcoming",
            history: "History",
          },
          appointmentCard: {
            msg: "Msg",
            notify: "Notify",
            serve: "Serve",
            cancel: "Cancel",
          },
          cancelled: "cancelled",
        },
        profile: {
          header: "Profile",
          options: {
            report: "Report",
            helpAndSupport: "Help & Support",
            about: "About",
          },
          logout: "Log Out",
        },
      },
    },
  },
};
