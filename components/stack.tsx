interface StackProps{
    name: string
}

export default function Stack ({name}:StackProps){
    return(
        <div className="border px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-md border-[#B9F503] text-[#B9F503] text-sm sm:text-base lg:text-lg hover:bg-[#B9F503] hover:text-black duration-200 transition-colors select-none">{name}</div>
    )
}