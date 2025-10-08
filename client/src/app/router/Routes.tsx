import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivitiesDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetailPage from "../../features/activities/details/ActivityDetailPage";
import Counter from "../../features/counter/Counter";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage /> },
            {path: 'activities', element: <ActivitiesDashboard /> },
            {path: 'activities/:id', element: <ActivityDetailPage /> },
            {path: 'createActivity', element: <ActivityForm key='create' /> },
            {path: 'manage/:id', element: <ActivityForm /> },
            {path: 'counter', element: <Counter /> },
        ]
    },
])