import React from 'react';
import { useForm } from 'react-hook-form';


export default function GridOptions({ header, height, width, startCol, startRow, finishRow, finishCol, onSubmit, onReset }) {
    const { register, handleSubmit, errors, reset } = useForm({
        defaultValues: {
            height: height,
            width: width,
        }
    });
    const Reset = () => {
        reset();
        onReset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="ui form segment">
            <h1>{header}</h1>
            <div className='two fields'>
                <div className='field'>
                    <label>height</label>
                    <input type="number" defaultValue={height} placeholder="height" name="height" ref={register({ required: true })} />
                </div>
                <div className='field'>
                    <label>width</label>
                    <input type="number" defaultValue={width} placeholder="width" name="width" ref={register({ required: true })} />
                </div>
            </div>
            <div className='two fields'>
                <div className='field'>
                    <label>startCol</label>
                    <input type="number" defaultValue={startCol} placeholder="startCol" name="startCol" ref={register({ required: true })} />
                </div>
                <div className='field'>
                    <label>startRow</label>
                    <input type="number" defaultValue={startRow} placeholder="startRow" name="startRow" ref={register({ required: true })} />
                </div>
            </div>
            <div className='two fields'>
                <div className='field'>
                    <label>finishRow</label>
                    <input type="number" defaultValue={finishRow} placeholder="finishRow" name="finishRow" ref={register({ required: true })} />
                </div>
                <div className='field'>
                    <label>finishCol</label>
                    <input type="number" defaultValue={finishCol} placeholder="finishCol" name="finishCol" ref={register({ required: true })} />
                </div>
            </div>
            <input type="submit" className="ui submit button" />
            <button className="ui submit secondary button" onClick={() => Reset()}>reset</button>
        </form>

    );
}