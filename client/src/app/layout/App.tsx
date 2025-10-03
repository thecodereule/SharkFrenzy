import { CssBaseline, List, ListItem, ListItemText } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import Navbar from "./navbar"

function App() {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/activities')
      .then(response => setActivities(response.data))

    return () => { }
  }, [])


  return (
    <>
      <CssBaseline />
      <Navbar />
      <List>
        {activities.map((activity) => (
          <ListItem key={activity.id}>
            <ListItemText primary={activity.title} />
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default App
