import { ActivityProps } from "./activity"

export interface CartProps{
    id: string
    userId: string
    activityId: string
    quantity: number
    createdAt: string
    updatedAt: string
    activity: ActivityProps
}