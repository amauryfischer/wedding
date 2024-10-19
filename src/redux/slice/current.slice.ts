import type { ICoordinates } from "@/type/data/ICoordinates"
import { createSlice } from "@reduxjs/toolkit"
import { createAppSlice } from "../createAppSlice"
import { BUILDING_TYPE } from "@/type/data/IPlanet"
import { ITaskFight } from "@/type/data/ITask"
import { User } from "@prisma/client"

export const currentSlice = createAppSlice({
	name: "current",
	initialState: {},
	reducers: {}
})

// Action creators are generated for each case reducer function
export const {

} = currentSlice.actions

export default currentSlice.reducer
