    import React, { useRef, useState, useEffect } from "react";
    import { v4 as uuidv4 } from 'uuid';

    const Manager = () => {

        let ref = useRef()
        let passwordRef = useRef()
        const [form, setForm] = useState({
            site: '',
            username: '',
            password: ''
        })

        const [passwordArray, setPasswordArray] = useState([])

        const copyText = (text) => {
            navigator.clipboard.writeText(text)
        }

        useEffect(() => {
            let passwords = localStorage.getItem('passwords')
            if (passwords) {
                setPasswordArray(JSON.parse(passwords))
            }
        }, [])

        const handleChange = (e) => {
            setForm({ ...form, [e.target.name]: e.target.value })
        }

        const savePassword = () => {
            if (form.site.length >= 3 && form.username.length >= 3 && form.password.length >= 3){
                setPasswordArray([...passwordArray, {...form, id: uuidv4()}])
                localStorage.setItem('passwords', JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
                console.log([...passwordArray, form])
                setForm({site: '',
                    username: '',
                    password: ''})
            }
        }

        const editPassword = (id) => {
            console.log(`editing password with ${id}`)
            setForm(passwordArray.filter(item=>item.id == id)[0])
            setPasswordArray(passwordArray.filter(item=>item.id != id))
        }

        const deletePassword = (id) => {
            let confirming = confirm('Do you want to delete your password')
            if(confirming) {
                setPasswordArray(passwordArray.filter(item=>item.id != id))
                localStorage.setItem('passwords', JSON.stringify(passwordArray.filter(item=>item.id != id)))
            }
        }

        const showPassword = () => {
            alert('Show the passowrd')
            console.log(ref.current.src)
            if (ref.current.src == 'http://localhost:5173/hidden.png') {
                ref.current.src = '/eye.png'
                console.log('apply eye')
                passwordRef.current.type = 'password'
            }
            else {
                console.log('apply hidden')
                passwordRef.current.type = 'text'
                ref.current.src = '/hidden.png'
            }
        }
        return (
            <>
                <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-700 opacity-20 blur-[100px]">
                    </div></div>
                <div className="md:mycontainer">
                    <h1 className="font-bold md:text-4xl text-2xl text-center">
                        <span className='text-green-700'>&lt;</span>
                        Password Manager
                        <span className='text-green-700'>/ &gt;</span>
                    </h1>
                    <p className="text-green-900 md:text-xl text-lg text-center">Your Own Password Manager</p>
                    <div className="text-black flex flex-col p-4 gap-8">
                        <input value={form.site} onChange={handleChange} placeholder="Enter Website Name" className="rounded-full border border-green-500 text-black px-4 py-1" type="text" name="site" />
                        <div className="flex md:flex-row flex-col w-full justify-between gap-8">

                            <input value={form.username} onChange={handleChange} placeholder="Enter Username" className="rounded-full border border-green-500 text-black px-4 py-1 w-full" type="text" name="username" />
                            <div className="relative flex flex-col justify-center">

                                <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder="Enter Password" className="rounded-full border border-green-500 text-black px-4 py-1 w-full" type="password" name="password" />
                                <img ref={ref} width={30} className="absolute right-0 pr-2 cursor-pointer" onClick={() => showPassword()} src="/eye.png" alt="" />

                            </div>
                        </div>

                        <button onClick={savePassword} className="self-center font-semibold text-lg flex justify-center items-center bg-green-500 hover:bg-green-400 rounded-full w-fit px-4 py-2 gap-2 border border-green-900">
                            <lord-icon
                                src="https://cdn.lordicon.com/jgnvfzqg.json"
                                trigger="hover">
                            </lord-icon>Save Password</button>
                    </div>

                    <div className="passwords">
                        <h2 className="font-bold text-xl py-4">Your Passwords</h2>
                        {passwordArray.length === 0 && <div>No Passwords to show</div>}
                        {passwordArray.length != 0 &&
                            <table className="table-auto w-full rounded-md overflow-hidden mb-4">
                                <thead className="bg-green-800 text-white">
                                    <tr>
                                        <th className="py-2">Site</th>
                                        <th className="py-2">Username</th>
                                        <th className="py-2">Password</th>
                                        <th className="py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-green-100">
                                    {passwordArray.map((item, index) => {
                                        return <tr key={index}>
                                            <td className="py-2 border border-white text-center">
                                                <div className="flex items-center justify-center">
                                                    <a href={item.site} target="_blank">{item.site}</a>
                                                    <div className="lordiconcopy size-7 cursor-pointer" onClick={(text) => copyText(item.site)}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/ijahpotn.json" style={{ 'width': '25px', "height": '25px', 'paddingTop': '3px' }}
                                                            trigger="hover">
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-2 border border-white text-center">
                                                <div className="flex items-center justify-center">
                                                    {item.username}
                                                    <div className="lordiconcopy size-7 cursor-pointer" onClick={(text) => copyText(item.username)}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/ijahpotn.json" style={{ 'width': '25px', "height": '25px', 'paddingTop': '3px' }}
                                                            trigger="hover">
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-2 border border-white text-center">
                                                <div className="flex items-center justify-center">
                                                    {item.password}
                                                    <div className="lordiconcopy size-7 cursor-pointer" onClick={(text) => copyText(item.password)}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/ijahpotn.json" style={{ 'width': '25px', "height": '25px', 'paddingTop': '3px' }}
                                                            trigger="hover">
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-2 border border-white text-center">
                                                <div className="flex items-center justify-center">
                                                    <div className="cursor-pointer" onClick={() => editPassword(item.id)}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/gwlusjdu.json" style={{ 'width': '25px', "height": '25px', 'paddingTop': '3px' }}
                                                        trigger="hover">
                                                    </lord-icon>
                                                    </div>
                                                    <div className="cursor-pointer" onClick={() => deletePassword(item.id)}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/wpyrrmcq.json"
                                                        trigger="hover"
                                                        style={{ 'width': '25px', "height": '25px', 'paddingTop': '3px' }}>
                                                    </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>}
                    </div>
                </div>
            </>
        );
    };

    export default Manager;
