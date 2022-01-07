import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';

import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number,
  taskNewTitle: string
}


export function Home() {
  // const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    const newtask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    const verifyTask = tasks.find(task => task.title === newTaskTitle)

    if(verifyTask){
      Alert.alert('Task já cadastrada!', 'Você não pode cadastrar uma task com o mesmo nome')
    } else{
      setTasks(oldState => [...oldState, newtask]);
    }

  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists    w
    const updatedTasks = tasks.map(task => ({...task}));
        
    const idToggleTasks = updatedTasks.find(item => item.id === id);

    if (idToggleTasks){
      idToggleTasks.done = !idToggleTasks.done;
    } 
    setTasks(updatedTasks);
    
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    Alert.alert('Remover Item', 'Tem certeza que você deseja remover esse item?',  [
      {
        style: 'destructive',
        text: "Sim",
        onPress: () => {const updatedTasks = tasks.filter(task => task.id !== id)
        setTasks(updatedTasks)}
      },
      {
        style: 'cancel',
        text: "Não"
      }
    ])
    
  }

  function handleEditTask({taskId, taskNewTitle}: EditTaskArgs){
    const updatedTasks = tasks.map(task => ({...task}));
        
    const idEditTask = updatedTasks.find(item => item.id === taskId);

    if (idEditTask){
      idEditTask.title = taskNewTitle
    } 
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask  = {handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})