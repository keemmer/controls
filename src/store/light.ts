import { create } from "zustand";
import { Device } from "@/model/light"; // Adjust the import path as necessary



export const lightStore = create<{
	lights: Device[];
	setOff: (id: string) => void;
	setOn: (id: string) => void;
	setToggle: (id: string) => void;
}>((set) => ({


	lights: [
		{
			id: "light1",
			name: "Kitchen",
			icon: "FaRegLightbulb",
			switch: false,
			description: "control your lights",
		},
		{
			id: "light2",
			name: "Bedroom",
			icon: "FaRegLightbulb",
			switch: true,
			description: "2 bedroom lights",
		},
		{
			id: "light3",
			name: "Living Room",
			icon: "FaRegLightbulb",
			switch: false,
			description: "main living area lights",
		},
		{
			id: "light4",
			name: "Bathroom",
			icon: "FaRegLightbulb",
			switch: false,
			description: "bathroom ceiling light",
		},
		{
			id: "light5",
			name: "Garage",
			icon: "FaRegLightbulb",
			switch: false,
			description: "garage overhead light",
		},
		{
			id: "light6",
			name: "Porch",
			icon: "FaRegLightbulb",
			switch: false,
			description: "front porch light",
		},
		{
			id: "light7",
			name: "Dining Room",
			icon: "FaRegLightbulb",
			switch: false,
			description: "dining area chandelier",
		},
		{
			id: "light8",
			name: "Hallway",
			icon: "FaRegLightbulb",
			switch: false,
			description: "hallway lights",
		},
		{
			id: "light9",
			name: "Office",
			icon: "FaRegLightbulb",
			switch: true,
			description: "office desk lamp",
		},
		{
			id: "light10",
			name: "Guest Room",
			icon: "FaRegLightbulb",
			switch: false,
			description: "guest room ceiling light",
		},
		{
			id: "light11",
			name: "Laundry",
			icon: "FaRegLightbulb",
			switch: false,
			description: "laundry room light",
		},
		{
			id: "light12",
			name: "Pantry",
			icon: "FaRegLightbulb",
			switch: false,
			description: "pantry light",
		},
		{
			id: "light13",
			name: "Staircase",
			icon: "FaRegLightbulb",
			switch: false,
			description: "staircase lights",
		},
		{
			id: "light14",
			name: "Backyard",
			icon: "FaRegLightbulb",
			switch: false,
			description: "backyard floodlight",
		},
		{
			id: "light15",
			name: "Attic",
			icon: "FaRegLightbulb",
			switch: false,
			description: "attic light",
		},
		{
			id: "light16",
			name: "Basement",
			icon: "FaRegLightbulb",
			switch: false,
			description: "basement lights",
		},
		{
			id: "light17",
			name: "Closet",
			icon: "FaRegLightbulb",
			switch: false,
			description: "closet light",
		},
		{
			id: "light18",
			name: "Balcony",
			icon: "FaRegLightbulb",
			switch: false,
			description: "balcony light",
		},
		{
			id: "light19",
			name: "Driveway",
			icon: "FaRegLightbulb",
			switch: false,
			description: "driveway light",
		},
		{
			id: "light20",
			name: "Workshop",
			icon: "FaRegLightbulb",
			switch: false,
			description: "workshop overhead light",
		},
	],
	setOff: (id: string) => set((state) => ({
		lights: state.lights.map((light) => light.id === id ? { ...light, switch: false } : light)
	})),
	setOn: (id: string) => set((state) => ({
		lights: state.lights.map((light) => light.id === id ? { ...light, switch: true } : light)
	})),
	setToggle: (id: string) => set((state) => ({
		lights: state.lights.map((light) => light.id === id ? { ...light, switch: !light.switch } : light)
	})),
}));