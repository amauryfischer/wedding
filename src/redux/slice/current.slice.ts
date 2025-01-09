import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../createAppSlice"
import { Product } from "@prisma/client"

export const currentSlice = createAppSlice({
	name: "current",
	initialState: {
		isOpenOfferModal: false,
		offerAmount: 0,
		offerProductId: undefined,
		products: [] as Product[]
	},
	reducers: {
		setIsOpenOfferModal: (
			state,
			action: PayloadAction<{
				isOpenOfferModal: boolean
				offerAmount: number
				offerProductId?: string
			}>
		) => {
			state.isOpenOfferModal = action.payload.isOpenOfferModal
			state.offerAmount = action.payload.offerAmount
			state.offerProductId = action.payload.offerProductId
		},
		setProducts: (
			state,
			action: PayloadAction<{
				products: Product[]
			}>
		) => {
			state.products = action.payload.products
		}
	}
})

// Action creators are generated for each case reducer function
export const { setIsOpenOfferModal, setProducts } = currentSlice.actions

export default currentSlice.reducer
