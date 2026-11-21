interface StackProps{
    name: string
}

export default function Stack ({name}:StackProps){
    return(
        <div className="border px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-md border-[#5C29EA] text-[#C9B7FF] text-sm sm:text-base lg:text-lg hover:bg-[#5C29EA] hover:text-white duration-200 transition-colors select-none">{name}</div>
    )
}