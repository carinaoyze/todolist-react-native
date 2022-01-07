import React, { useState, useRef, useEffect } from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text, TextInput} from 'react-native';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'
import Icon from 'react-native-vector-icons/Feather';

import { Task } from '../components/TasksList';
import {EditTaskArgs} from '../pages/Home';

interface TaskItemProps {
    task: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask:({taskId, taskNewTitle}: EditTaskArgs) => void; 
    
}

export function TaskItem({task, toggleTaskDone, removeTask, editTask}: TaskItemProps) {

    const [editedTask, setEditTask] = useState(false);

    const [savetask, setSaveTasks] = useState(task.title);

    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing() {
        setEditTask(true)
    }

    function handleCancelEditing(){
        setSaveTasks(task.title)
        setEditTask(false);
    }

    function handleSubmitEditing(){
        editTask({taskId: task.id, taskNewTitle: savetask});
        setEditTask(false);
    }

    useEffect(() => {
        if (textInputRef.current) {
          if (editedTask) {
            textInputRef.current.focus();
          } else {
            textInputRef.current.blur();
          }
        }
    }, [editedTask])

    return(
        <View  style={styles.container}  >
            <View style={styles.infoContainer}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    //TODO - use onPress (toggle task) prop
                    onPress={() => toggleTaskDone(task.id)}

                >
                    <View 
                    //TODO - use style prop 
                    style = {task.done === true ? styles.taskMarkerDone : styles.taskMarker}
                    >
                    { task.done && (
                        <Icon 
                        name="check"
                        size={12}
                        color="#FFF"
                        />
                    )}
                    </View>

                    <TextInput
                    ref={textInputRef}
                    style={ task.done ? styles.taskTextDone : styles.taskText}
                    value={savetask}
                    editable={editedTask}
                    onChangeText={setSaveTasks}
                    onSubmitEditing={handleSubmitEditing}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.iconsContainer}>
                    {editedTask ? (<TouchableOpacity
                    onPress={handleCancelEditing}>
                    <Icon name="x" size={24} color="#b2b2b2" />
                    </TouchableOpacity>): <TouchableOpacity
                    onPress={handleStartEditing}>
                    <Image source={editIcon} />
                    </TouchableOpacity>}
                
                    <View style={styles.iconsDivider} />
                
                    <TouchableOpacity
                    disabled = {editedTask}
                    onPress={() => removeTask(task.id)}
                    >
                    <Image source={trashIcon} style={{opacity: editedTask ? 0.2 : 1}}/>
                    </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
       
    },
    infoContainer:{
        flex:1,

    },
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    },
    iconsContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 24
    },
    iconsDivider:{
        width:1,
        height:24,
        backgroundColor: 'rgba(196, 196, 196, 0.24)',
        marginHorizontal: 12

    }
})