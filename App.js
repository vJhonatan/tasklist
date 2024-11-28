import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import TaskCard from './TaskCard'
import { useState , useEffect } from 'react';
import { getRequest , postRequest, deleteRequest } from './api/Api';

export default function App() {

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [task, setTask] = useState([]);
  const [alert1, setAlert1] = useState(false);
  const [alert2, setAlert2] = useState(false);

  const onMessage = async () => {

    setAlert1(false);
    setAlert2(false);

    if (taskTitle !== "" && taskDescription.length >= 10) {

      let newTask = await postRequest(taskTitle, taskDescription);

      setTask(newTask);

      setTaskTitle("");
      setTaskDescription("");

    } else {
      if (!taskTitle.trim()) {
        setAlert1(true)
        setTimeout(() => {
          setAlert1(false)
        }, 4000);
      }

      if (taskDescription.length < 10) {
        setAlert2(true)
        setTimeout(() => {
          setAlert2(false)
        }, 4000);
      }
    }
  }

  const deleteTask = (index,id) => {
    const updateTasks = [...task];
    updateTasks.splice(index, 1);
    deleteRequest(id);
    setTask(updateTasks);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await getRequest();
        setTask(resp);
      } catch (ex) {
        console.error(ex);
      }
    };

    fetchData();
  }, []);

  return (

    <View style={styles.container}>

      <Text style={styles.label}>Task Name</Text>

      {
        alert1 ? <Text style={styles.errotText}>Title must be provided</Text> : <></>
      }

      <TextInput
        style={styles.input}
        placeholder='Enter the task name'
        value={taskTitle}
        onChangeText={setTaskTitle} />

      <Text style={styles.label}>Task Description</Text>

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder='Enter the task description'
        value={taskDescription}
        onChangeText={setTaskDescription}
        multiline />

      {
        alert2 ? <Text style={styles.errotText}>Minimum 10 characters required</Text> : <></>
      }

      <View style={styles.buttonContainer}>
        <Button title='Save'
          style={styles.buttonGreen}
          color='darkgreen'
          onPress={
            () => onMessage()}
        />

      </View> 

      {
        task.length > 0 ? <View style={styles.separator} /> : <> </>
      }

      <ScrollView>
        {
          task.map((item, index) => (

            <TaskCard
              key={item.id}
              title={item.title}
              desc={item.description}
              status={"Done"}
              onclick={() => deleteTask(index,item.id)}
            /> 
          ))
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16
  },
  label: {
    fontSize: 16,
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 'bold',
    padding: 10,
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  },
  buttonContainer: {
    marginTop: 16
  },
  buttonGreen: {
    borderRadius: 12
  },
  separator: {
    marginTop: 16,
    width: "100%",
    height: 1,
    backgroundColor: "#222"
  },
  errotText: {
    color: "red",
    fontSize: 12,
    fontStyle: "italic"
  }
}); 
