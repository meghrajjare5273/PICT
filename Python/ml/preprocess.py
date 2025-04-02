# Python/ml/preprocess.py
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, OneHotEncoder, LabelEncoder
from sklearn.compose import ColumnTransformer
from sklearn.model_selection import KFold
import logging

# Configure logging for better debugging in a server environment
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def suggest_missing_strategy(df):
    # Existing code remains unchanged
    missing_counts = df.isnull().sum()
    total_rows = len(df)
    if missing_counts.sum() == 0:
        return 'mean'
    missing_percentages = missing_counts / total_rows
    numeric_cols = df.select_dtypes(include=[np.number]).columns
    categorical_cols = df.select_dtypes(include=['object', 'category']).columns
    if any(missing_percentages > 0.5):
        return 'drop'
    if numeric_cols.isin(missing_counts[missing_counts > 0].index).any():
        skewness = df[numeric_cols].skew()
        if any(abs(skewness) > 1):
            return 'median'
        return 'mean'
    if categorical_cols.isin(missing_counts[missing_counts > 0].index).any():
        return 'mode'
    return 'mean'

def target_encode(df, categorical_col, target_col):
    """Perform target encoding on a categorical column using the target variable."""
    target_means = df.groupby(categorical_col)[target_col].mean()
    return df[categorical_col].map(target_means)

def kfold_target_encode(df, categorical_col, target_col, n_splits=5):
    """Perform K-Fold target encoding to prevent data leakage."""
    kf = KFold(n_splits=n_splits, shuffle=True, random_state=42)
    df_encoded = df.copy()
    encoded_col = np.zeros(len(df))
    
    for train_idx, val_idx in kf.split(df):
        train_df, val_df = df.iloc[train_idx], df.iloc[val_idx]
        target_means = train_df.groupby(categorical_col)[target_col].mean()
        encoded_col[val_idx] = val_df[categorical_col].map(target_means).fillna(train_df[target_col].mean())
    
    df_encoded[categorical_col] = encoded_col
    return df_encoded

def preprocess_data(df, target_column=None, scaling=True, encoding='onehot', missing_strategy='median', **kwargs):
    df_processed = df.copy()
    logger.info(f"Handling missing values with strategy: {missing_strategy}")
    if missing_strategy == 'median':
        numeric_cols = df_processed.select_dtypes(include=[np.number]).columns
        for col in numeric_cols:
            df_processed[col] = df_processed[col].fillna(df_processed[col].median())
        categorical_cols = df_processed.select_dtypes(include=['object', 'category']).columns
        for col in categorical_cols:
            df_processed[col] = df_processed[col].fillna('missing')

    numeric_cols = df_processed.select_dtypes(include=[np.number]).columns.tolist()
    categorical_cols = df_processed.select_dtypes(include=['object', 'category']).columns.tolist()

    scaling_cols = numeric_cols if scaling else []
    encoding_cols = [col for col in categorical_cols if col != target_column]
    passthrough_cols = [col for col in df_processed.columns 
                       if col not in scaling_cols and col not in encoding_cols and col != target_column]

    if target_column and target_column in df_processed.columns:
        if target_column in scaling_cols:
            scaling_cols.remove(target_column)
        if target_column in encoding_cols:
            encoding_cols.remove(target_column)
        target_data = df_processed[target_column]

    transformers = []
    if scaling_cols:
        transformers.append(('num', StandardScaler(), scaling_cols))
    if encoding_cols:
        transformers.append(('cat', OneHotEncoder(drop='first', sparse_output=False), encoding_cols))
    if passthrough_cols:
        transformers.append(('pass', 'passthrough', passthrough_cols))

    preprocessor = ColumnTransformer(transformers=transformers, remainder='drop')
    transformed_data = preprocessor.fit_transform(df_processed)

    feature_names = []
    for name, transformer, cols in preprocessor.transformers_:
        if name == 'num' or name == 'pass':
            feature_names.extend(cols)
        elif name == 'cat' and encoding == 'onehot':
            feature_names.extend(preprocessor.named_transformers_['cat'].get_feature_names_out(cols))

    logger.info(f"Transformed data shape: {transformed_data.shape}")
    logger.info(f"Feature names length: {len(feature_names)}")
    logger.info(f"Feature names: {feature_names}")

    df_processed = pd.DataFrame(transformed_data, columns=feature_names)
    if target_column and target_column in df.columns:
        df_processed[target_column] = target_data.values

    return df_processed
    
def save_preprocessed_data(df, filename="preprocessed_data.csv"):
    try:
        file_path = f"uploads/{filename}"
        df.to_csv(file_path, index=False)
        return file_path
    except Exception as e:
        logger.error(f"Error saving preprocessed data: {str(e)}")
        raise