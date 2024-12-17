# Ervoice Invoice Management Library

The Ervoice library provides a complete solution for creating, managing, and previewing invoices with payment links using the ErcasPay API. With this library, you can seamlessly integrate invoice management into your application.

## Features

- User-friendly invoice form and preview UI components.
- Automatic payment link generation using ErcasPay API.
- Toggle between form and preview seamlessly within the same component.
- Easy integration with minimal configuration.

## Installation

Install the library using npm:

```bash
npm install @your-org/ervoice
```

## Usage

### Basic Setup

To use the library, simply import the `Invoice` component and set your `baseUrl` and `secretKey`:

```javascript
import Invoice from "@your-org/ervoice";

function App() {
  return (
    <div className="App">
      <Invoice
        baseUrl="https://api.merchant.staging.ercaspay.com/api/v1"
        secretKey="ECRS-TEST-SKga84vcdU9u3Mbf6vh28ZIScZugauatzSnWVXEnOk"
      />
    </div>
  );
}

export default App;
```

### Invoice Component
The `Invoice` component contains both the form and the preview. Upon form submission, the invoice preview is displayed, and the user can generate a payment link or download the invoice as a PDF.

#### Props
- `baseUrl` (string): The base URL for the ErcasPay API.
- `secretKey` (string): Your ErcasPay secret key.

### Example Usage
```javascript
import Invoice from "@your-org/ervoice";

function App() {
  return (
    <div>
      <Invoice
        baseUrl="https://api.merchant.staging.ercaspay.com/api/v1"
        secretKey="your-secret-key"
      />
    </div>
  );
}
```

### Switching Between Form and Preview
The `Invoice` component handles toggling between the invoice form and the preview dynamically. Users do not need to manage separate routes or components for this functionality.

### Generating Payment Links
The library uses the ErcasPay API to create payment links automatically. Make sure your `baseUrl` and `secretKey` are configured correctly to enable this functionality.

## Development

To contribute to this library:

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build the library:
   ```bash
   npm run build
   ```

## License

This project is licensed under the MIT License.

---
For further assistance, contact our support team or refer to the [documentation](#).
