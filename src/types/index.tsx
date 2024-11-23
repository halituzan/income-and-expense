export interface ExpenseItem {
    category?: Category;
    amount: number;
    date: string;
    id: string;
    description?: string
    categoryId?: string
}
export interface Category {
    id: string;
    name: string;
};

export interface FormattedData {
    name: string;
    id: string;
    [key: string]: number | string;

}

export interface FormProps {
    id: string;
    amount: number;
    categoryId: string;
    date: string;
    category?: Category;
    description: string
}

export interface NavigationProps {
    id: string,
    label: string,
    path: string,
    icon: string,
    position: string,
}