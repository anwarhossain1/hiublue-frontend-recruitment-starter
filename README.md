# Dashboard Summary with Stats

This is a React-based dashboard summary component using Material UI that fetches and displays statistics, offers sent, and website visits.

## Features

- Displays total active users, clicks, and appearances.
- Provides a dropdown filter for selecting time ranges (this week, previous week).
- Shows website visit statistics and offers sent.
- Uses MUI `Grid` for layout and `Table` for structured data presentation.
- Uses Apex charts for data visualizations.
- Implements responsive and scrollable table with a formatted number display (e.g., `1k` for `1000`).

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/anwarhossain1/hiublue-frontend-recruitment-starter.git
   cd hiublue-frontend-recruitment-starter
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```

## Usage

- Ensure the API routes are correctly configured in `API_ROUTES`.
- The dashboard fetches data based on the selected time filter.
- Use the `CustomSelect` component to toggle between different time filters.
- Data visualization components like `StatCard`, `WebsiteVisit`, and `OffersSent` display relevant information.

## Customization

- Modify the API endpoints in `API_ROUTES`.
- Customize table columns inside `OffersTable.tsx`.
- Adjust the UI by modifying MUI components and styles.

## Tech Stack

- React.js (with Next.js structure)
- Material UI (MUI) for styling and layout
- Fetch API for data retrieval

## Tradeoffs

- Dashboard has responsiveness issue for the mui table

## License

This project is licensed under the MIT License.

---

Made with ❤️ by Anwar Hossain
