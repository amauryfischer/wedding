import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../createAppSlice"
import _, { rest } from "lodash"
interface ReducerState {
	entity: {
		[key: string]: { [key: string]: any }
	}
	lastSyncDate: Record<string, string>
}

export const dynamicSlice = createAppSlice({
	name: "dynamic",
	initialState: {
		entity: {},
		lastSyncDate: {} as Record<string, string>
	} as ReducerState,
	reducers: {
		setData: (state, action: PayloadAction<{ type: string; data: any }>) => {
			const { type, data } = action.payload
			// delete all data
			Object.keys(state?.entity?.[type] ?? {}).forEach((key) => {
				delete state.entity[type][key]
			})
			state.entity[type] = {}
			const dataArray = data ?? []
			dataArray.forEach((item: any) => {
				state.entity[type] = {
					...state.entity[type],
					[item.id]: item
				}
			})
			state.lastSyncDate = {
				...state.lastSyncDate,
				[type]: new Date().toISOString()
			}
		},
		addData: (
			state,
			action: PayloadAction<{ type: string; dataId: string; data: any }>
		) => {
			const { type, dataId, data } = action.payload

			state.entity[type] = {
				...state.entity[type],
				[dataId]: data
			}
		},
		updateData: (
			state,
			action: PayloadAction<{ type: string; dataId: string; data: any }>
		) => {
			const { type, dataId, data } = action.payload
			const entity = state.entity?.[type] ?? {}
			state.entity[type] = {
				...entity,
				[dataId]: {
					...(entity?.[dataId] ?? {}),
					...data
				}
			}
		},
		setSolarSystemData: (
			state,
			action: PayloadAction<{ type: string; data: any }>
		) => {
			const { type, data } = action.payload
			if (_.isEmpty(data)) return
			const allData = JSON.parse(JSON.stringify(state.entity))[type] ?? []
			let solarSystemData = Object.values(allData).filter(
				(item: any) => item.solarSystem === data.solarSystem
			)
			data.forEach((item: any) => {
				solarSystemData = solarSystemData.filter(
					(dataElement: any) => dataElement.id !== item.id
				)
				state.entity[type] = {
					...state.entity[type],
					[item.id]: item
				}
			})
			solarSystemData.forEach((item: any) => delete state.entity[type][item.id])
		},
		deleteData: (
			state,
			action: PayloadAction<{ type: string; dataId: string }>
		) => {
			const { type, dataId } = action.payload
			delete state.entity[type][dataId]
		},
		removeDataConditional: (
			state,
			action: PayloadAction<{ type: string; condition: (data: any) => boolean }>
		) => {
			const { type, condition } = action.payload
			Object.keys(state.entity[type] ?? {}).forEach((key) => {
				if (condition(state.entity[type][key])) {
					delete state.entity[type][key]
				}
			})
		}
	}
})

export const {
	setData,
	addData,
	updateData,
	deleteData,
	removeDataConditional,
	setSolarSystemData
} = dynamicSlice.actions

export default dynamicSlice.reducer
