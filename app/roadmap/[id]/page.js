'use client'
import React from 'react'
import { useState , useEffect} from 'react';
import { usePathname } from 'next/navigation'
import Navbar from '../../components/Navbar';
import parse from 'html-react-parser';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Skeleton } from "../../components/ui/skeleton";
const page = () => {
    const [data, setData] = useState("")
    const genAI = new GoogleGenerativeAI('AIzaSyAB1w7APtk8CthX1m8EubVkfmE5n-ZYF-Y');

    const pathname = usePathname();
    const splitted = pathname.split("/");
    const Branch = (splitted[splitted.length - 1].split("%20").join(' '));

    async function run() {
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro"});

        const prompt = `Provide an exhaustive and fool proof roadmap in form of html code to become a ${Branch} in India in 2024. Make it very descriptive and lengthy. Provide details about the best coaching institutions, entrance exams to clear(if any), best colleges in India, scholarships offered by the institutes if any. Use tailwind CSS for styling etc. Use h2 tag for main headings and h4 tags for sub headings and heading.`

        const result = await model.generateContent(prompt);
        const response = result.response;
        console.log(response);
        const text = response.text();
        const splittedtext = text?.split("<body>")[1]?.split("</body>")[0];
        setData(splittedtext);
        console.log(splittedtext);
    }

    useEffect(() => {
        run();

    }, [])



    // const roadmap = localStorage.getItem(Branch)

    return (
        <>
            <Navbar />
            <div className='mt-4 mx-10 px-16'>
                {data.length>0?<p>{parse(data)}</p>:
            
                <div className="flex flex-col justify-center items-center space-y-3 mt-36">
                    <Skeleton className="h-[250px] w-[500px] rounded-xl" />
                    <div className="space-y-2 ">
                        <Skeleton className="h-4 w-[500px]" />
                        <Skeleton className="h-4 w-[500px]" />
                    </div>
                </div>}
                
                
            </div>

        </>
    )
}

export default page