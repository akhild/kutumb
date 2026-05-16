import { TPersonMap, TRelationMap } from "@/types/model";

const persons: TPersonMap = {
  "P001": {
    _id: "P001",
    metadata: {
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    firstName: "Akhil",
    middleName: "Keshavrao",
    lastName: "Deshmukh",

    gender: "male",
    birth: {
      date: new Date(1989, 3, 7).getTime(),
      place: "kosra"
    },
    death: {},

    photos: [],
    bio: "Self",

    up: ["R001", "R002"],
    down: [],
    side: ["R008"]
  },

  "P002": {
    _id: "P002",
    metadata: {
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    firstName: "Keshavrao",
    middleName: "Pandurang",
    lastName: "Deshmukh",

    gender: "male",
    birth: {
      date: new Date(1954, 30, 9).getTime(),
      place: "Masalmeta"
    },
    death: {},

    photos: [],
    bio: "",

    up: [],
    down: ["R001", "R003"],
    side: ["R009"]
  },

  "P003": {
    _id: "P003",
    metadata: {
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    firstName: "Jasudha",
    middleName: "Keshavrao",
    lastName: "Deshmukh",

    gender: "female",
    birth: {
      date: new Date(1967, 2, 8).getTime(),
      place: "kosra"
    },
    death: {},

    photos: [],
    bio: "Self",

    up: [],
    down: ["R002", "R003.1"],
    side: ["R009"]
  },

  "P004": {
    _id: "P004",
    metadata: {
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    firstName: "Snehal",
    middleName: "Keshavrao",
    lastName: "Deshmukh",

    gender: "female",
    birth: {
      date: new Date(1987, 10, 7).getTime(),
      place: "kalyan"
    },
    death: {},

    photos: [],
    bio: "Self",

    up: ["R003", "R003.1"],
    down: [],
    side: []
  },

  "P005": {
    _id: "P005",
    metadata: {
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    firstName: "Sneha",
    middleName: "Ashokkumar",
    lastName: "Borkar",

    gender: "female",
    birth: {
      date: new Date(1993, 8, 4).getTime(),
      place: "Nagpur"
    },
    death: {},

    photos: [],
    bio: "Self",

    up: ["R004", "R005"],
    down: [],
    side: ["R008"]
  },

  "P006": {
    _id: "P006",
    metadata: {
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    firstName: "Ashokkumar",
    middleName: "",
    lastName: "Borkar",

    gender: "male",
    birth: {
      date: new Date(1956, 8, 17).getTime(),
      place: "Nagpur"
    },
    death: {},

    photos: [],
    bio: "Self",

    up: [],
    down: ["R004", "R006"],
    side: ["R010"]
  },

  "P007": {
    _id: "P007",
    metadata: {
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    firstName: "Nanda",
    middleName: "Ashokkumar",
    lastName: "Borkar",

    gender: "female",
    birth: {
      date: new Date(1969, 9, 10).getTime(),
      place: "Nagpur"
    },
    death: {},

    photos: [],
    bio: "Self",

    up: [],
    down: ["R005", "R007"],
    side: ["R010"]
  },

  "P008": {
    _id: "P008",
    metadata: {
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    firstName: "Ketan",
    middleName: "Ashokkumar",
    lastName: "Borkar",

    gender: "male",
    birth: {
      date: new Date(1999, 3, 17).getTime(),
      place: "Thane"
    },
    death: {},

    photos: [],
    bio: "Self",

    up: ["R006", "R007"],
    down: [],
    side: []
  }
}

const relations: TRelationMap = {
  "R001": {
    _id: "R001",

    from: "P002",
    to: "P001",
    type: "parent_child",
    roles: "biological",

    startDate: null,
    endDate: null,
    status: "active",

    notes: "",
    metadata: {
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
  },

  "R002": {
    _id: "R002",

    from: "P003",
    to: "P001",
    type: "parent_child",
    roles: "biological",

    startDate: null,
    endDate: null,
    status: "active",

    notes: "",
    metadata: {
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
  },

  "R003": {
    _id: "R003",

    from: "P002",
    to: "P004",
    type: "parent_child",
    roles: "biological",

    startDate: null,
    endDate: null,
    status: "active",

    notes: "",
    metadata: {
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
  },

  "R003.1": {
    _id: "R003.1",

    from: "P003",
    to: "P004",
    type: "parent_child",
    roles: "biological",

    startDate: null,
    endDate: null,
    status: "active",

    notes: "",
    metadata: {
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
  },

  "R004": {
    _id: "R004",

    from: "P006",
    to: "P005",
    type: "parent_child",
    roles: "biological",

    startDate: null,
    endDate: null,
    status: "active",

    notes: "",
    metadata: {
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
  },

  "R005": {
    _id: "R005",

    from: "P007",
    to: "P005",
    type: "parent_child",
    roles: "biological",

    startDate: null,
    endDate: null,
    status: "active",

    notes: "",
    metadata: {
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
  },

  "R006": {
    _id: "R006",

    from: "P006",
    to: "P008",
    type: "parent_child",
    roles: "biological",

    startDate: null,
    endDate: null,
    status: "active",

    notes: "",
    metadata: {
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
  },

  "R007": {
    _id: "R007",

    from: "P007",
    to: "P008",
    type: "parent_child",
    roles: "biological",

    startDate: null,
    endDate: null,
    status: "active",

    notes: "",
    metadata: {
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
  },

  "R008": {
    _id: "R008",

    from: "P001",
    to: "P005",
    type: "partner",
    roles: "spouse",

    startDate: null,
    endDate: null,
    status: "active",

    notes: "",
    metadata: {
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
  },

  "R009": {
    _id: "R009",
    from: "P002",
    to: "P003",
    type: "partner",
    roles: "spouse",

    startDate: new Date(1985, 5, 10).getTime(),
    endDate: null,
    status: "active",

    notes: "",
    metadata: {
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
  },

  "R010": {
    _id: "R010",

    from: "P006",
    to: "P007",
    type: "partner",
    roles: "spouse",

    startDate: new Date(1985, 9, 23).getTime(),
    endDate: null,
    status: "active",

    notes: "",
    metadata: {
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
  },

}

export { persons, relations };
