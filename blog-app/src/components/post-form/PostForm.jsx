import React, {useCallback} from 'react';
import { useForm } from 'react-hook-form';
import {CustomButton} from '../CustomButton'
import {CustomInput} from '../CustomInput'
import RTE from '../RTE';
import appwriteService from "../../appwrite/database"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PostForm = ({post}) => {
    const {register, handleSubmit, watch, setValue, getValues, control} = useForm({
        defaultValues:{
            title: post?.title || '',
            content: post?.content || '',
            slug: post?.slug || '',
            tags: post?.tags || [],
            status: post?.status || 'active'
        }
    })

    const navigate = useNavigate()
    const userData = useSelector(state=>state.user.userData)

    const submit = async (data) =>{
        if (post){
            const file = data.image[0] ? appwriteService.uploadFile(data.image[0]) : null;
            if (file){
                appwriteService.deleteFile(post.featuredImage)

            }
            const dbPost = await appwriteService.updatePost(
                post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined // we should hand;e error here
                }
            )
            if (dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }
        else{
            const file = await appwriteService.uploadFile(data.image[0])
            if (file){
                const fileId = file.$id
                data.featuredImage = fileId 
                await appwriteService.createPost({
                    ...data,
                    userId: userData.$id
                })
                if (dbPost){
                    navigate(`/post/${dbPost.$id}`)

                }
            }
        }
    }

    // we want space to be replacewd with a slug like "-", '% or something
    const slugtransform = useCallback((value)=>{
        if (value && typeof(value) === 'string'){
            return value.trim().toLowerCase().replace(/^[a-zA-Z\d\s]+/g, '-')
                .replace(/\s/g, '-')
        }
        return ''
    }, []) // callback also has a dep array


    React.useEffect(() => {
        const subscription = watch((value, {name})=>{
            if (name === 'title'){
                setValue('slug', slugtransform(value.title, {shouldValidate: true})) // slug value set kr rhe h
            }
        })

        return () => {
            subscription.unsubscribe()
        }
        
    }, [watch, slugtransform, setValue]);
    return (
        <form onSubmit={handleSubmit(submit)}>
            <div>
                <CustomInput label="Title: "
                    {...register('title', {
                        required: true
                    })}
                >
                </CustomInput>

                <CustomInput label="Slug: "
                    placeholder="Slug"
                    {...register('title', {
                        required: true
                    })}
                    onInput={(e)=>{setValue('slug', slugtransform(e.currentTarget.value), {
                        shouldValidate: true
                    })}}
                >

                </CustomInput>

                <RTE label="Content: " name="content"
                    control={control} defaultValue={getValues("content")}
                >

                </RTE>
            </div>

            //create another div for featured image as well
        </form>
    );
}

export default PostForm;


/*
const PostForm = () => { default but what if user cam to edit this
    const {register, handleSubmit, watch, setValue, getValues, control} = useForm({
        defaultValues:{
            title: '',
            content: '',
            tags: [],
            status: 'public',
            cover: '',
        }
    })




*?