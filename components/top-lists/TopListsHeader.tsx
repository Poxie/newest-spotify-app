import styles from '../../styles/TopLists.module.scss';
import { useRouter } from "next/router";
import { Dropdown } from "../dropdown";

const COUNTRIES = ["Global", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bangladesh", "Belgium", "Bolivia", "Brazil", "Bulgaria", "Cambodia", "Canada", "CAR", "Chile", "Colombia", "Costa Rica", "Cote D'Ivoire", "Cyprus", "Czech Republic", "Denmark", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Estonia", "Faroe Islands", "Finland", "France", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Guatemala", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kyrgyzstan", "Latvia", "Lebanon", "Liechtenstein", "Lithuania", "Luxembourg", "Malaysia", "Malta", "Mexico", "Monaco", "Montserrat", "Morocco", "Myanmar", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Pakistan", "Panama", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Romania", "Saint Lucia", "San Marino", "Saudi Arabia", "Serbia", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Somalia", "South Africa", "Spain", "Sri Lanka", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tanzania", "Thailand", "Tunisia", "Turkey", "Turkmenistan", "Uganda", "Ukraine", "UAE", "United Kingdom", "United States", "Uruguay", "Venezuela", "Vietnam", "Zimbabwe"];
const LOWER_CASE_COUNTRIES = COUNTRIES.map(country => country.toLowerCase());

export const TopListsHeader = () => {
    const router = useRouter();
    const query = router.query as { country?: string };
    const country = query.country ? query.country : 'Global';

    const changeCountry = (item: string) => {
        router.replace(`/top-lists?country=${item}`, undefined, { shallow: true });
    }

    return(
        <div className={styles['header']}>
            <h1>
                Top songs
                {' '}
                <span className="underlined highlighted">
                    {country === 'Global' ? 'globally' : `in ${country}`}
                </span>
            </h1>

            <Dropdown 
                resultsPosition={'right'}
                defaultSelected={country}
                onChange={changeCountry}
                items={COUNTRIES}
                allowSearch
            />
        </div>
    )
}