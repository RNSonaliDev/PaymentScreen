import React, { useRef, useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";

const getSchema = (transferType: string) => {
    let schema = yup.object().shape({
        recipient: yup.string().required("Recipient name is required"),
        accountNumber: yup
            .string()
            .required("Account number is required")
            .matches(/^[a-zA-Z0-9]+$/, "Account number must be alphanumeric"),
        amount: yup
            .number()
            .typeError("Amount must be a number")
            .positive("Amount must be positive")
            .required("Amount is required"),
    });

    if (transferType === "international") {
        schema = schema.shape({
            iban: yup
                .string()
                .length(34, "IBAN must be 34 characters")
                .required("IBAN is required"),
            swift: yup
                .string()
                .matches(
                    /^[A-Z]{4}-[A-Z]{2}-[A-Z]{2}-\d{2}$/,
                    "Invalid SWIFT format (AAAA-BB-CC-12)"
                )
                .required("SWIFT code is required"),
        });
    }
    return schema;
};

const PaymentScreen = () => {
    const [transferType, setTransferType] = useState("domestic");
    const recipientRef = useRef<TextInput>(null);
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<{ recipient: string; accountNumber: string; amount: string; iban?: string, swift?: string}, any, { recipient: string; accountNumber: string; amount: string; swift?: string, iban?: string}>({
        resolver: yupResolver(getSchema(transferType)),
    });

    const submitHandler = () => {
        alert(`Payment Successfully`);
    };

    const changeTab = (selectedType: any) => {
        setTransferType(selectedType)
        reset({}, { keepErrors: false, keepDirty: false, keepValues: false });
        setTimeout(() => recipientRef.current?.focus(), 100);
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar />
            <Text style={styles.title}>Payment Gateway</Text>

            <View style={styles.radioContainer}>
                <TouchableOpacity
                    style={styles.radioOption}
                    onPress={() => changeTab("domestic")}
                >
                    <View style={styles.radioCircle}>
                        {transferType === "domestic" && <View style={styles.radioDot} />}
                    </View>
                    <Text>Domestic Transfer</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.radioOption}
                    onPress={() => changeTab("international")}
                >
                    <View style={styles.radioCircle}>
                        {transferType === "international" && <View style={styles.radioDot} />}
                    </View>
                    <Text>International Transfer</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.subtitle}>
                {transferType === "domestic" ? "Domestic Transfer" : "International Transfer"}
            </Text>

            <Controller
                control={control}
                name="recipient"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        ref={recipientRef}
                        style={styles.input}
                        placeholder="Recipient Name"
                        value={value}
                        onChangeText={onChange}
                        autoFocus={true}
                    />
                )}
            />
            {errors.recipient && <Text style={styles.error}>{errors.recipient.message}</Text>}

            <Controller
                control={control}
                name="accountNumber"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Account Number"
                        value={value}
                        onChangeText={onChange}
                    />
                )}
            />
            {errors.accountNumber && (
                <Text style={styles.error}>{errors.accountNumber.message}</Text>
            )}

            <Controller
                control={control}
                name="amount"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Amount"
                        value={value}
                        onChangeText={onChange}
                        keyboardType="numeric"
                    />
                )}
            />
            {errors.amount && <Text style={styles.error}>{errors.amount.message}</Text>}

            {transferType === "international" && (
                <>
                    <Controller
                        control={control}
                        name="iban"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="IBAN (34 chars)"
                                value={value}
                                maxLength={34}
                                onChangeText={onChange}
                            />
                        )}
                    />
                    {errors.iban && <Text style={styles.error}>{errors.iban.message}</Text>}

                    <Controller
                        control={control}
                        name="swift"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="SWIFT code (e.g., AAAA-BB-CC-12)"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />
                    {errors.swift && <Text style={styles.error}>{errors.swift.message}</Text>}
                </>
            )}

            {/* <Button title="Send Payment" onPress={handleSubmit(submitHandler)} /> */}
            <TouchableOpacity style={styles.paymentButton} onPress={handleSubmit(submitHandler)}>
                <Text style={styles.paymentTxt}>Send Payment</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    paymentButton: { justifyContent: "center", alignItems: "center", height: 40,  padding: 10, backgroundColor: "#007AFF", borderRadius: 10, marginTop: 20 },
    paymentTxt: { color: "#FFF", fontWeight: "bold" },
    container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    subtitle: { fontSize: 16, fontWeight: "600", marginVertical: 10 },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 5,
        marginTop: 5,
    },
    error: { color: "red", marginBottom: 10, fontSize: 12 },

    radioContainer: {
        flexDirection: "row",
        marginBottom: 15,
    },
    radioOption: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 20,
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#007AFF",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 5,
    },
    radioDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#007AFF",
    },
});

export default PaymentScreen;
