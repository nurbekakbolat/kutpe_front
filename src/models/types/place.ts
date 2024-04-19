interface Place {
    name: string
    icon: string
    status: keyof typeof statusColors
    location: string
    [key: string]: string
}

const statusColors = {
    high: 'red',
    medium: 'orange',
    low: 'green'
}

const places: Place[] = [
    {
      name: "Jusan, Nazarbayev University",
      icon: "/path/to/icon1.png",
      status: "high",
      location: "Nazarbayev University"
    },
    {
      name: "Jusan, Mega Silkway",
      icon: "/path/to/icon2.png",
      status: "low",
      location: "Mega Silkway"
    },
    {
      name: "Kaspi Bank, Mega Silkway",
      icon: "/path/to/icon3.png",
      status: "medium",
      location: "Mega Silkway"
    },
    {
      name: "Halyk Bank, Dostyk Plaza",
      icon: "/path/to/icon4.png",
      status: "medium",
      location: "Dostyk Plaza"
    },
    {
      name: "Sulpak, Khan Shatyr",
      icon: "/path/to/icon5.png",
      status: "high",
      location: "Khan Shatyr"
    },
    {
      name: "Magnum, Abu Dhabi Plaza",
      icon: "/path/to/icon6.png",
      status: "low",
      location: "Abu Dhabi Plaza"
    },
    {
      name: "Technodom, Baiterek Tower",
      icon: "/path/to/icon7.png",
      status: "high",
      location: "Baiterek Tower"
    },
    {
      name: "Starbucks, Esentai Mall",
      icon: "/path/to/icon8.png",
      status: "medium",
      location: "Esentai Mall"
    }
  ];

  interface Org {
    id: number;
    name: string;
    email: string;
    phone_number: string;
    org_id: number;
}

interface Queue {
    id: number;
    number_of_people: number;
    waiting_time: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    participants: any[];
    org: Org;
    date: string;
    current_pos: number;
    count: number;
    description: string;
    num_servers: number;
    max_service: number;
    min_service: number;
}


export { places, statusColors }

export type { Place, Queue }