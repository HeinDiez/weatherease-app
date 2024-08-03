export const twmerge = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ')
}