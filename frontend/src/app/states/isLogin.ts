import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useIsLogin = create(
	persist(
		(set) => ({
			isLogin: false,
			setIsLogin: (isLogin: boolean) => set({ isLogin }),
		}),
		{
			name: "login",
			storage: createJSONStorage(() => sessionStorage),
			onRehydrateStorage: () => (state, error) => {
				if (error) {
					console.error("Failed to rehydrate login state:", error);
				}
			},
		}
	)
);
